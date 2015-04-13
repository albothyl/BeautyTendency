package com.beauty.tendency.configrations;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

/**
 * Created by on 2015. 3. 21..
 */
public class DataSourceBuilder {
    public DataSource build(Environment environment) {
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setURL(environment.getProperty("test.mysql.jdbc.url"));
        dataSource.setUser(environment.getProperty("test.mysql.jdbc.username"));
        dataSource.setPassword(environment.getProperty("test.mysql.jdbc.password"));

        return dataSource;
    }
}
