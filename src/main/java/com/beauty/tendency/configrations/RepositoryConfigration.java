package com.beauty.tendency.configrations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

/**
 * Created by on 2015. 3. 17..
 */
@Configuration
@PropertySource("classpath:beautyTendency.properties/project-develop.xml")
public class RepositoryConfigration {
    @Autowired
    private Environment environment;

    @Bean
    public DataSource dataSource() {
     return new DataSourceBuilder().build(environment);
    }
}
