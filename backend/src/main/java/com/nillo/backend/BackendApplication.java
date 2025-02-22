package com.nillo.backend;

import com.nillo.backend.role.Role;
import com.nillo.backend.role.RoleRepository;
import com.nillo.backend.solr.SolrService;
import com.nillo.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository, SolrService service) {
		return args -> {
service.addBook();
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
