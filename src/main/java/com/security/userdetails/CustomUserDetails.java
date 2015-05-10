package com.security.userdetails;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {

    /**
	 *
	 */
	private static final long serialVersionUID = 4424979814070137320L;

	/**
     * User 클래스의 생성자 Override
     * @param username 사용자계정
     * @param password 사용자 패스워드
     * @param enabled 사용자계정 사용여부
     * @param accountNonExpired
     * @param credentialsNonExpired
     * @param accountNonLocked
     * @param authorities
     * @param userVO 사용자 VO객체
     * @throws IllegalArgumentException
     */
    public CustomUserDetails(String username, String password, boolean enabled,
            boolean accountNonExpired, boolean credentialsNonExpired,
            boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities,
            Object userVO) throws IllegalArgumentException {

        super(username, password, enabled, accountNonExpired,
            credentialsNonExpired, accountNonLocked, authorities);

        this.userVO = userVO;
    }

    public CustomUserDetails(String username, String password, boolean enabled,
    		Object userVO) throws IllegalArgumentException {

    	this(username, password, enabled, true, true, true,
    			Arrays.asList(new GrantedAuthority[] {new SimpleGrantedAuthority("HOLDER")}), userVO);
    }

	private Object userVO;

    /**
     * @return 사용자VO 객체
     */
    public Object getUserVO() {
        return userVO;
    }

    /**
     * @param egovVO 사용자VO객체
     */
    public void setUserVO(Object userVO) {
        this.userVO = userVO;
    }
}