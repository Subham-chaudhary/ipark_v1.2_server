package com.ipark.adminpanel.controller;

import com.ipark.adminpanel.entity.Operator;
import com.ipark.adminpanel.repository.OperatorRepo;
import com.ipark.adminpanel.service.OperatorService;
import com.ipark.adminpanel.service.UserDetailsServiceImpl;
import com.ipark.adminpanel.utils.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private OperatorService operatorService;

    @Autowired
    private OperatorRepo operatorRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Operator user) {
        try {
            operatorService.saveAdmin(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Exception occurred while registering user", e);
            return new ResponseEntity<>("An error occurred", HttpStatus.BAD_REQUEST);
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Operator user, HttpServletResponse res) {
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPhoneNumber())
//            );
//            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUserName());
//            Operator users = operatorRepo.findByUserName(user.getUserName());
//            String accessToken = jwtUtil.generateAccessToken(users.getId().toString(), users.getRoles());
//            String refreshToken = jwtUtil.generateRefreshToken(users.getId().toString(), users.getRoles());
//            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
//                    .httpOnly(true)
//                    .secure(false)
//                    .path("/")
//                    .build();
//            res.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//            cookie = ResponseCookie.from("accessToken", accessToken)
//                    .httpOnly(true)
//                    .secure(false)
//                    .path("/")
//                    .build();
//            res.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//            return new ResponseEntity<>("User Logged In", HttpStatus.OK);
//        } catch (Exception e) {
//            log.error("Exception occurred while createAuthenticationToken", e);
//            return new ResponseEntity<>("Incorrect username or password", HttpStatus.BAD_REQUEST);
//        }
//    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest req, HttpServletResponse res) {
        try {
            String refreshToken = null;
            if (req.getCookies() != null) {
                for (Cookie cookie : req.getCookies()) {
                    if (cookie.getName().equals("refreshToken")) {
                        refreshToken = cookie.getValue();
                    }
                }
            }
            String accessToken = jwtUtil.refreshAccessToken(refreshToken);
            if (accessToken != null) {
                ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken)
                        .httpOnly(true)
                        .secure(false)
                        .path("/")
                        .build();
                res.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            }
            return new ResponseEntity<>("Refreshed Access Token", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Exception occurred while refreshingAccessToken", e);
            return new ResponseEntity<>("Refresh Token Expired", HttpStatus.BAD_REQUEST);
        }
    }
}
