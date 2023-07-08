package com.cravio.authenticationservice.controller;

import com.cravio.authenticationservice.model.JwtRequest;
import com.cravio.authenticationservice.model.JwtResponse;
import com.cravio.authenticationservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class JwtController {

    @Autowired
    private JwtService jwtService;

    /**
     * Creates a JWT token for authentication.
     *
     * @param jwtRequest The JWT request containing user credentials.
     * @return JwtResponse containing the generated JWT token.
     * @throws Exception if an error occurs during token generation.
     */
    @PostMapping({"/authenticate"})
    public JwtResponse createJwtToken(@RequestBody @Valid JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);
    }
}
