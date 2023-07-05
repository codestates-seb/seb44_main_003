package com.ott.server.crawling;

import com.ott.server.media.dto.CreateOrUpdateMediaDto;
import com.ott.server.media.service.MediaService;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/crawling")
//@Component
@Slf4j
public class CrawlingController {
    private WebDriver driver;
    private final MediaService mediaService;

    public CrawlingController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    private static final String url = "https://www.justwatch.com/kr";

    @GetMapping
    public String process() throws InterruptedException{

        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Snu\\Desktop\\chromedriver.exe");
        System.setProperty("webdriver.http.factory", "jdk-http-client");


        log.error("크롬 드라이버 확인");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-popup-blocking");       //팝업안띄움
        //options.addArguments("headless");                       //브라우저 안띄움
        options.addArguments("--disable-gpu");			//gpu 비활성화
        options.addArguments("--blink-settings=imagesEnabled=false"); //이미지 다운 안받음

        driver = new ChromeDriver(options);


        log.error("크롬 드라이버 생성");
        try {
            getDataList();
            log.error("getDataList() 실행 완료");
        } catch (InterruptedException e){
            log.error("getDataList() 에러 발생");
            e.printStackTrace();

        }

        driver.close();	//탭 닫기
        driver.quit();	//브라우저 닫기

        return "log 확인";
    }
    private List<String> getDataList() throws InterruptedException{
        List<String> list = new ArrayList<>();

        WebDriverWait webDriverWait = new WebDriverWait(driver, Duration.ofSeconds(10));


        driver.get(url);

        webDriverWait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("html/body/div[1]/div[4]/div[4]/div/div[2]/div[1]/div/div")));
        log.info("동의 누르기===");
        Thread.sleep(4000);


        log.info("동의 성공");
        Thread.sleep(500);

        int location = 1;
        //for(WebElement element: elements){
        while(location != 100){
            try {
                WebElement element = driver.findElement(
                         By.xpath("/html/body/div[1]/div[4]/div[4]/div/div[2]/div[1]/div/div[" + (location++) + "]"));
                //Thread.sleep(1000);

                element.findElement(By.tagName("a")).click();
                if(location%8==0)
                    ((JavascriptExecutor)driver).executeScript("window.scrollTo(0, 275)");
            }catch (RuntimeException e){
                location++;
                continue;
            }
            System.out.println("=======================");

            Thread.sleep(1000);
            System.out.println(location-1+") 데이터 수집");
            List<WebElement> otts = driver.findElements(By.className("price-comparison__grid__row__holder"));
            List<String> mediaOtts = new ArrayList<>();

            //Disney Plus, wavve, Netflix, Watcha
            for(int i = 1; i <= otts.size(); i++)
            {
                try{
                    String ott = otts.get(i-1).findElement(
                            By.xpath("//*[@id=\"base\"]/div[2]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[3]/div[2]/div["+i+"]/div/a/picture/img")).getAttribute("title");
                    if(ott.equals("wavve")||ott.equals("Watcha")||ott.equals("Netflix")||ott.equals("Disney Plus"))
                        mediaOtts.add(ott);

                }catch (RuntimeException e){
                }
            }
            if(mediaOtts.size() == 0) {
                driver.navigate().back();
                continue;
            }



            String mainPoster = driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[1]/div/aside/div[1]/div[1]/picture/source[1]")).getAttribute("data-srcset").split(",")[0];

            int releaseDate = Integer.valueOf(driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/span")).getText().substring(1, 5));

            String content = new String();
            try{
                content = driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[5]/div[2]/p/span")).getText();
            }catch (RuntimeException e){
                content = driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[2]/div[4]/p/span")).getText();
            }

            List<String> genres = List.of(driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[1]/div/aside/div[1]/div[3]/div[2]/div[2]")).getText().split(", "));

            String category = driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[1]/div/aside/div[1]/div[1]/span[1]")).getText();
            if(category.equals("")) category = "영화";
            boolean recent = false;


            //제목,  감독, 출연진, 연령등급

            String title = new String(); //driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/h1")).getText();

            System.out.println("제목    : "+ title);
            System.out.println("이미지    : "+ mainPoster);
            System.out.println("내용    : " + content);
            System.out.println("OTT : "+ mediaOtts);
            System.out.println("출시일    : "+ releaseDate);
            System.out.println("장르 : "+genres);
            System.out.println("카테고리 : "+category);
            System.out.println("최신작 : "+recent);

            /*
            private String title;
            private String content;
            private String category;
            private String creator;
            private String cast;
            private String mainPoster;
            private String titlePoster;
            private int releaseDate;
            private String ageRate;
            private Boolean recent;
            private List<String> genre;
            private List<String> mediaOtt;
             */
            CreateOrUpdateMediaDto createData = new CreateOrUpdateMediaDto(title, content, category, "creator", "cast", mainPoster, "titlePoster", releaseDate, "ageRate", recent,genres, mediaOtts);
            mediaService.createMedia(createData);

            System.out.println();
            driver.navigate().back();

        }

        return list;
    }
}
