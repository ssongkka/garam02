package com.garam02;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.garam.Garam02Application;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
class Garam02ApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void aaaaa() {
		System.out.println("하하하이이이");
	}
}
