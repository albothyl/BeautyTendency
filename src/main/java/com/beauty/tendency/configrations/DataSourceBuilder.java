package com.beauty.tendency.configrations;

import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * Created by on 2015. 3. 21..
 */
public class DataSourceBuilder {
    public DataSource build(Environment environment) throws SQLException {
        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriver(new com.mysql.jdbc.Driver());
        dataSource.setUrl(environment.getProperty("beautyTendency.mysql.jdbc.url"));
        dataSource.setUsername(environment.getProperty("beautyTendency.mysql.jdbc.username"));
        dataSource.setPassword(environment.getProperty("beautyTendency.mysql.jdbc.password"));

        return dataSource;
    }
}
