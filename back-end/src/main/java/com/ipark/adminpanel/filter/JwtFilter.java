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

@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    private ClientService clientService;

    @Autowired
    private JwtUtil jwtUtil;

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
                id = jwtUtil.extractAccessTokenUid(jwt);
                LotUid = jwtUtil.extractAccessTokenLotUid(jwt);

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
                jwt = jwtUtil.refreshAccessToken(refreshToken);
                id = jwtUtil.extractAccessTokenUid(jwt);
                LotUid = jwtUtil.extractAccessTokenLotUid(jwt);

            } catch (RuntimeException ex) {
                log.error("Some error occurred: {}", ex.getMessage());
            }
        }
        //
//        Clients myClient = clientRepo.findByClientUid(UUID.fromString(id));
//        System.out.println("Retrieved the details by ID: " + myClient);
        System.out.println("LotUid in JWT FILTER: " + LotUid);
        if (LotUid != null) {
            UserDetails client = userDetailsService.loadUserByUsername(id);
//            UserDetails = userDetailsService.loadUserByUsername(userName);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(client, null, client.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(req, res);
    }
}
