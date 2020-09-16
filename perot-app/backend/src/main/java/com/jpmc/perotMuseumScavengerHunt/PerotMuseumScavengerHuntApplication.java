package com.jpmc.perotMuseumScavengerHunt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@SpringBootApplication(scanBasePackages = {"com.jpmc.perotMuseumScavengerHunt"})
public class PerotMuseumScavengerHuntApplication {

	public static void main(String[] args) {
		SpringApplication.run(PerotMuseumScavengerHuntApplication.class, args);
	}

}
