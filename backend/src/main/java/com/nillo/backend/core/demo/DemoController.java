package com.nillo.backend.core.demo;

import com.nillo.backend.user.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("demo")
@RequiredArgsConstructor
@Tag(name = "Demo")
@Slf4j
public class DemoController {

    private final DemoRepository repository;

    @GetMapping
    public ResponseEntity<List<Demo>> findAllBooks() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<Integer> save(
            @Valid @RequestBody Demo request,
            Authentication connectedUser
    ) {
        User user = ((User) connectedUser.getPrincipal());
        log.info(user.getEmail());
        return ResponseEntity.ok(repository.save(request).getId());
    }
}
