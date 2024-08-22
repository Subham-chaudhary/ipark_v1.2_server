package com.ipark.adminpanel.filter;

import com.ipark.adminpanel.repository.OperatorRepo;
import com.ipark.adminpanel.service.UserDetailsServiceImpl;
import com.ipark.adminpanel.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private OperatorRepo operatorRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        String authorizationHeader = req.getHeader("Authorization");
        String userName = null;
        String refreshToken = null;
        String jwt = null;
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
            jwt = authorizationHeader.substring(7);
            try {
                if(jwtUtil.validateAccessToken(jwt)) {
                    String id = jwtUtil.extractAccessTokenUid(jwt);
                    if(id != null) {
                        userName = operatorRepo.findById(id).getUserName();
                    }
                }
            } catch (RuntimeException e) {
                log.error("Some error occurred: {}", e.getMessage());
                try {
                    if(req.getCookies() != null) {
                        for(Cookie cookie : req.getCookies()) {
                            if(cookie.getName().equals("refreshToken")) {
                                refreshToken = cookie.getValue();
                            }
                        }
                    }
                    jwt = jwtUtil.refreshAccessToken(refreshToken);
                    String id = jwtUtil.extractAccessTokenUid(jwt);
                    if(id != null) {
                        userName = operatorRepo.findById(id).getUserName();
                    }
                } catch (RuntimeException ex) {
                    log.error("Some error occurred: {}", ex.getMessage());
                }
            }
        }

        if(userName != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(req, res);
    }
}
