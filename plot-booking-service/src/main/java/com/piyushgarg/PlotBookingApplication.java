package com.piyushgarg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@SpringBootApplication
public class PlotBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlotBookingApplication.class, args);
	}

	@Bean
	public WebFluxConfigurer corsConfigurer() {

		return new WebFluxConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
					.addMapping("/plots/**")
					.allowedMethods(HttpMethod.GET.toString(), HttpMethod.PUT.toString());
			}
		};
	}

}
