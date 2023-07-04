package com.ott.server.crawling;

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



            driver.getWindowHandle();
            Thread.sleep(1000);
            System.out.println(location-1+") 데이터 수집");
            System.out.print("제목    : ");
            System.out.println(driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/h1")).getText());
            System.out.print("이미지    : ");
            System.out.println(driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[1]/div/aside/div[1]/div[1]/picture/source[1]")).getAttribute("data-srcset"));
            System.out.print("출시일    : ");
            System.out.println(driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/span")).getText());
            System.out.print("내용    : ");
            try{
                System.out.println(driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[5]/div[2]/p/span")).getText());
            }catch (RuntimeException e){
                System.out.println(driver.findElement(By.xpath("/html/body/div[1]/div[4]/div[2]/div/div[2]/div[2]/div[2]/div[4]/p/span")).getText());
            }

            List<WebElement> otts = driver.findElements(By.className("price-comparison__grid__row__holder"));

            System.out.println(otts.size());
            System.out.print("OTT   : ");
            for(int i = 1; i <= otts.size(); i++)
            {
                try{
                System.out.print(otts.get(i-1).findElement(By.xpath("//*[@id=\"base\"]/div[2]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[3]/div[2]/div["+i+"]/div/a/picture/img")).getAttribute("title")+",");
                }catch (RuntimeException e){
                }
            }
            //driver.get(url);
            System.out.println();
            driver.navigate().back();

        }

        return list;
    }
}
