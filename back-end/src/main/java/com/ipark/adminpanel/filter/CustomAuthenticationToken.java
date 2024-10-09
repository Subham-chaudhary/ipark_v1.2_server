package com.ipark.adminpanel.filter;


import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


@Getter
@Setter
@Deprecated
public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {
    private String preUid;

    public CustomAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, String preUid) {
        super(principal, credentials, authorities);
        System.out.println("preUid = " + preUid);
        this.preUid = preUid;
    }

}
