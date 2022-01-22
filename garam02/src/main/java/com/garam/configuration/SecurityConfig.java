package com.garam.configuration;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.garam.web.login.context.FormAuthenticationProvider;
import com.garam.web.login.handler.TaskLogoutHandler;
import com.garam.web.login.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final CustomUserDetailsService userDetailsService;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * 인증되지 않은 요청중 AJAX요청일 경우 403으로 응답, AJAX요청이 아닐 경우 login으로 리다이렉트
	 * 
	 * @param url
	 * @return
	 */

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/").permitAll().antMatchers("/**").authenticated();

		http.csrf().disable();

		http.formLogin().loginPage("/").loginProcessingUrl("/login").usernameParameter("username")
				.passwordParameter("password").defaultSuccessUrl("/dashboard").permitAll();

		http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.addLogoutHandler(new TaskLogoutHandler()).permitAll().logoutSuccessUrl("/");
		http.exceptionHandling().authenticationEntryPoint(new AjaxAuthenticationEntryPoint("/"));
	}

	@Override
	public void configure(WebSecurity web) {
		// /css/**, /images/**, /js/** 등 정적 리소스는 보안필터를 거치지 않게 한다.
		web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		return new FormAuthenticationProvider(userDetailsService, passwordEncoder());
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
}