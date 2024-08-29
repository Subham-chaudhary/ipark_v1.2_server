package com.ipark.adminpanel.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class JwtUtil {

    private SecretKey getAccessTokenSigningKey() {
        String SECRET_KEY = "ae232c19b86cd1627225b55e20939553f6ce254db3fb5c4335a9df9000a27ec467d05d0780cc9568ee352b042b13beb9558e43b15c88c2ad6781cf9cb83b8ae16a8a4ae793e8e78eb96e42b194d90c7e001aa9a48b20c6764f1f55d49ab13a2f09ecf96396d2befb06a3babbbe6c8437ff06fc48ea92913af0f91414179e6bfa140909e8637226a30c0e72fa7df164d9c0a0d18a52e016d35f2868c845b3c7962a03b0b44fad22784f927ec33b8f4d5249c683ab89fed6b18940906d4644ed1ced8f101d49b1252a1356bb874859deedf6c29c4a5ff38da5e09c868fafe6b98be41f9f4858c712aa48d06ded4b85a34b1c89f0bee4ad2e035e50e8e8790e3493cdec1044dbd645adbdf2010edffde042d459ccb14de24b43a2e3c3f62f53d3f6d172102c9bb53f2b7ce3c57bd51a912bf35f62e2116bde8f6456256e69dc08a8f562626b35c2ae01e8bb3239d1a847f02fe9b2e70d768dd98c93e1efe95c16b1f277303ddef6f3d61c18b64dc95586462cdf9c1d50a4c3e19dcc32e01751732ff9573dc0c05a24cc50ffdf05a9f49316b859a09eee8feb6b8a35b16995e3680da6c25227fe3e1e03909c8651a3cb01578e801bc5718e54c97ca2a28c366bbf3ccde9336b82b58e398a62f8e5d1c39ef6d8ce26386cee4e16e9e55628c806b4088266acd65b43124c8d138510ea1e6b8c2614fc321f3e6953b9fb9c3a5b7d2b30";
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    private SecretKey getRefreshTokenSigningKey() {
        String SECRET_KEY = "61faf444deb00c3daa316166312b92ba75b8f5cc6a4d6af30fa6dd2f28fee502543639f0fb2b83c156207eee029e932b110358a53504f9575bb963f2a516833e48ac05a7b5a85c151a1fb225f4b79f251550b33309c81df9d8094134e5f0581171c936788270e17bd43bbc3722333a8bb4eda9a36ade40ab90710b59f8fc519ff23768975f7aed05afe863aa6b5d721a0652da451c9f7460dcc3b7a0aa5d13c81a81984f69c849c5b8b12d3e0915d78bba2a4316b6709a5ed637221c5ff50ae96bdefa9e1306bd0da8c51b9ac6fa8ee526fc79eee7d10dca84c065e62beaf3d5c8e13fe76c53becf344d341705cabbe8b9468d8f81d4adec34a9f6fecfa8726f980220828f3482983ffea6c1dcd67e91c1debffcad288c5b872e933a7a2e5b16e9b8b7277da92a5df14daf510f96c047834d9e54ecfbd1d827ccbb01e31dccb5456b0943781e177730c83ec4f10f7a370982c919725cc4f654ae225d6be38578caa0444a5572227b11f47fd20715c5c93b8b53641e53580f99e989118717a61ccb791028ac9997df67f974e303ad13ecadfc9480e421996e6c3141e1917fce363bef46693eb987a02163303cf3f54a6acb9c592f1d318714a8b37e7e99d0cb9a67ad58f829e946c923668e1fb6f5ff53a97b5f89c8eb54b626d7aa516744b86bc086ae515c1693f1a424be3fea5d37fc692418dc02db4f0d48f897fdae01687f";
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String extractAccessTokenUid(String token) {
        if(validateAccessToken(token)) {
            Claims claims = extractAllClaims(token, getAccessTokenSigningKey());
            return claims.getSubject();
        }
        return null;
    }

    public String extractRefreshTokenUid(String token) {
        if(validateRefreshToken(token)) {
            Claims claims = extractAllClaims(token, getRefreshTokenSigningKey());
            return claims.getSubject();
        }
        return null;
    }

    public List<String> extractAccessTokenRoles(String token) {
        if(validateAccessToken(token)) {
            Claims claims = extractAllClaims(token, getAccessTokenSigningKey());
            return (List<String>) claims.get("ROLES");
        }
        return null;
    }

    public String extractRefreshTokenRoles(String token) {
        if(validateRefreshToken(token)) {
            Claims claims = extractAllClaims(token, getRefreshTokenSigningKey());
            return (String) claims.get("PreUid");
        }
        return null;
    }

    public Date extractAccessTokenExpiration(String token) {
                return extractAllClaims(token, getAccessTokenSigningKey()).getExpiration();
    }

    public Date extractRefreshTokenExpiration(String token) {
        return extractAllClaims(token, getRefreshTokenSigningKey()).getExpiration();
    }

    private Claims extractAllClaims(String token, SecretKey signingKey) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private boolean isAccessTokenExpired(String token) {
        return extractAccessTokenExpiration(token).before(new Date());
    }

    private boolean isRefreshTokenExpired(String token) {
        return extractRefreshTokenExpiration(token).before(new Date());
    }

    public String generateAccessToken(String uid, String preUid) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("PreUid", preUid);
        int ACCESS_TOKEN_EXPIRATION = 1000 * 60* 60;
        return createToken(claims, uid, ACCESS_TOKEN_EXPIRATION, getAccessTokenSigningKey());
    }

    public String generateRefreshToken(String uid, String preUid) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("PreUid", preUid);
        int REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7;
        return createToken(claims, uid, REFRESH_TOKEN_EXPIRATION, getRefreshTokenSigningKey());
    }

    public String createToken(Map<String, Object> claims, String subject, int TOKEN_EXPIRATION, SecretKey signingKey) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .header().empty().add("typ", "JWT")
                .and()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION))
                .signWith(signingKey)
                .compact();
    }

    public String refreshAccessToken(String refreshToken) {
        if(validateRefreshToken(refreshToken)) {
            return generateAccessToken(extractRefreshTokenUid(refreshToken), extractRefreshTokenRoles(refreshToken));
        }
        return null;
    }

    public boolean validateRefreshToken(String token) {
        return !isRefreshTokenExpired(token);
    }

    public boolean validateAccessToken(String token) {
        return !isAccessTokenExpired(token);
    }
}
