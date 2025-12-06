package com.ticketflow.core.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketflow.core.model.User;
import com.ticketflow.core.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String usernameOrEmail = loginData.get("username");
        String password = loginData.get("password");

        System.out.println("Intento de login para: " + usernameOrEmail);
        Optional<User> userOpt = userRepository.findByUsername(usernameOrEmail);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (password.equals(user.getPassword())) {
                return ResponseEntity.ok(Map.of(
                        "message", "Login exitoso",
                        "userId", user.getId(),
                        "role", user.getRole(),
                        "username", user.getUsername()));
            }
        }

        return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
    }
}