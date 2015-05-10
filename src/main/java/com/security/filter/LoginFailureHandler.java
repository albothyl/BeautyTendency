package com.security.filter;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;


public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	String defaultFailureUrl;

	private ObjectMapper mapper = new ObjectMapper();

	public LoginFailureHandler(String defaultFailureUrl) {
		super(defaultFailureUrl);
		this.defaultFailureUrl = defaultFailureUrl;
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException auth) throws IOException, ServletException {
	//	 response.sendRedirect(request.getContextPath() + "/auth/login");

		if ("application/json".equals(request.getHeader("Content-Type"))) {
			//로그인 실패시 처
		}else{
			response.sendRedirect(request.getContextPath() + this.defaultFailureUrl);
		}
	}

	@Override
	public void setUseForward(boolean forwardToDestination) {
		super.setUseForward(forwardToDestination);
	}


}
