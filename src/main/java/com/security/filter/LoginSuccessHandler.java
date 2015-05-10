package com.security.filter;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.groovy.control.messages.Message;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.security.userdetails.CustomUserDetails;
import com.security.vo.UserDetailsVO;

public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private ObjectMapper mapper = new ObjectMapper();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

		CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
		UserDetailsVO user =(UserDetailsVO)principal.getUserVO();

		if ("application/json".equals(request.getHeader("Content-Type"))) {
			// 로그인 성공 처리
		}else{
			super.onAuthenticationSuccess(request, response, authentication);
		}
	}

	@Override
	public void setAlwaysUseDefaultTargetUrl(boolean alwaysUseDefaultTargetUrl) {
		super.setAlwaysUseDefaultTargetUrl(alwaysUseDefaultTargetUrl);
	}

	@Override
	public void setDefaultTargetUrl(String defaultTargetUrl) {
		super.setDefaultTargetUrl(defaultTargetUrl);
	}

}
