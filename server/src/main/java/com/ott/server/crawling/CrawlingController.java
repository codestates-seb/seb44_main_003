package com.ott.server.crawling;

import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.service.MediaService;
import com.ott.server.mediaott.entity.MediaOtt;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.element.Element;
import javax.validation.constraints.Positive;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static org.openqa.selenium.support.ui.ExpectedConditions.numberOfWindowsToBe;
import static org.openqa.selenium.support.ui.ExpectedConditions.or;

@RestController
@RequestMapping("/crawling")
//@Component
@Slf4j
public class CrawlingController {

    private final CrawlingService crawlingService;

    public CrawlingController(CrawlingService crawlingService) {
        this.crawlingService = crawlingService;
    }


    @PostMapping
    public String process(@RequestBody @Positive LocationDto requestBody) throws InterruptedException{

        int location = requestBody.getLocation();
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Snu\\Desktop\\chromedriver.exe");
        System.setProperty("webdriver.http.factory", "jdk-http-client");

        int lastLocation = crawlingService.crawlMedias(location);
        if(lastLocation == -1)
            return "Crawling 실패";
        return "Crawling 성공 log 확인";
    }

}
