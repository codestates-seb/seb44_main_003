package com.ott.server;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
@OpenAPIDefinition(info = @Info(title = "My API", version = "v1"),
		security = @SecurityRequirement(name = "bearerAuth"))
@SecurityScheme(
		name = "bearerAuth",
		type = SecuritySchemeType.HTTP,
		scheme = "bearer",
		bearerFormat = "JWT"
)
@SpringBootApplication
@EnableJpaAuditing
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
