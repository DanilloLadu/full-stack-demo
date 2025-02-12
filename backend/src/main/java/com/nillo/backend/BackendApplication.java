package com.nillo.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
//
//	@Bean
//	public CommandLineRunner runner(RoleRepository roleRepository, UserRepository userRepository) {
//		return args -> {
//
//			if (roleRepository.findByName("USER").isEmpty()) {
//				roleRepository.save(
//						Role.builder()
//								.name("USER")
//								.createdDate(LocalDateTime.now())
//								.build());
//			}
//		};
//	}
}
