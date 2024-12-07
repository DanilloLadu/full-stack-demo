package com.nillo.backend;

import com.nillo.backend.role.Role;
import com.nillo.backend.role.RoleRepository;
import com.nillo.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository, UserRepository userRepository) {
		return args -> {

			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(
						Role.builder()
								.name("USER")
								.createdDate(LocalDateTime.now())
								.build());
			}
		};
	}
}
