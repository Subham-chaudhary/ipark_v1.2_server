package com.ipark.adminpanel.filter;

import com.ipark.adminpanel.repository.ClientRepo;
import com.ipark.adminpanel.service.ClientService;
import com.ipark.adminpanel.service.UserDetailsServiceImpl;
import com.ipark.adminpanel.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public JwtFilter(UserDetailsServiceImpl userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest req, @NonNull HttpServletResponse res,@NonNull FilterChain chain) throws ServletException, IOException {
//        String authorizationHeader = req.getHeader("Authorization");
        String LotUid = null;
        String refreshToken = null;
        String jwt = null;
        String id = null;
        if (req.getCookies() != null) {
            for (Cookie cookie : req.getCookies()) {
                if (cookie.getName().equals("accessToken")) jwt = cookie.getValue();
            }
        }

        try {
            if (jwtUtil.validateAccessToken(jwt)) {
                id = jwtUtil.extractAccessTokenUid(jwt).toString();
                LotUid = jwtUtil.extractAccessTokenLotUid(jwt).toString();

            }
        } catch (RuntimeException e) {
            log.error("Some error occurred: {}", e.getMessage());
            try {
                if (req.getCookies() != null) {
                    for (Cookie cookie : req.getCookies()) {
                        if (cookie.getName().equals("refreshToken")) {
                            refreshToken = cookie.getValue();
                        }
                    }
                }
                jwt = jwtUtil.refreshAccessToken(refreshToken).toString();
                id = jwtUtil.extractAccessTokenUid(jwt).toString();
                LotUid = jwtUtil.extractAccessTokenLotUid(jwt).toString();

            } catch (RuntimeException ex) {
                log.error("Some error occurred: {}", ex.getMessage());
            }
        }

        System.out.println("LotUid in JWT FILTER: " + LotUid);
        if (LotUid != null) {
            UserDetails client = userDetailsService.loadUserByUsername(id);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(client, null, client.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(req, res);
    }
}
