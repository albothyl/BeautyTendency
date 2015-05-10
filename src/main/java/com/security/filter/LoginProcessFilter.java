package com.security.filter;

import java.io.BufferedReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import com.security.vo.LoginRequest;

public class LoginProcessFilter extends CustomUsernamePasswordAuthenticationFilter {

	  private String jsonUsername = "";
	  private String jsonPassword = "";
	  private String jsonUserTypecd = "";

	  @Override
	  protected String obtainPassword(HttpServletRequest request)  {
		  String password = null;


		  if ("application/json".equals(request.getHeader("Content-Type"))) {
			  password = this.jsonPassword;
		  }else{
			  password = super.obtainPassword(request);
		  }

	//	  this.password = password;
	      return password;
	  }

	  @Override
	  protected String obtainUsername (HttpServletRequest request){
		  String username = null;

		  if ("application/json".equals(request.getHeader("Content-Type"))) {
			  username = this.jsonUsername;
		  }else{
			  username = super.obtainUsername(request);
		  }

		  return username;
	  }

	  @Override
	  protected String obtainUserTypecd (HttpServletRequest request){
		  String userTypecd = null;

		  if ("application/json".equals(request.getHeader("Content-Type"))) {
			  userTypecd = this.jsonUserTypecd;
		  }else{
			  userTypecd = super.obtainUsername(request);
		  }

		  return userTypecd;
	  }



	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		String langCd = null;
		if ("application/json".equals(request.getHeader("Content-Type"))) {
	            try {
	                /*
	                 * HttpServletRequest can be read only once
	                 */
	                StringBuffer sb = new StringBuffer();
	                String line = null;

	                BufferedReader reader = request.getReader();
	                while ((line = reader.readLine()) != null){
	                    sb.append(line);
	                }

	                //json transformation
	                ObjectMapper mapper = new ObjectMapper();
	                LoginRequest loginRequest = mapper.readValue(sb.toString(), LoginRequest.class);

	                this.jsonUsername = loginRequest.getJ_username();
	                this.jsonPassword = loginRequest.getJ_password();
	                this.jsonUserTypecd = loginRequest.getUserTypeCd();

	                langCd = loginRequest.getLangCd();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }else{
	        	langCd = request.getParameter("langCd");
	        }

		    request.getSession().setAttribute("langCd", langCd);
			return super.attemptAuthentication(request, response);
	}


}
