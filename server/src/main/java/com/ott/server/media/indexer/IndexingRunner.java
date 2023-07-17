package com.ott.server.media.indexer;

import com.ott.server.media.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class IndexingRunner implements ApplicationRunner {

    @Autowired
    private MediaService mediaService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        mediaService.indexAllMedia();
    }
}

