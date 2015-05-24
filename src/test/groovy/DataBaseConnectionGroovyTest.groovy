import com.beauty.tendency.configrations.RepositoryConfig
import org.junit.Assert
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification

import javax.sql.DataSource


/**
 * Created by on 2015. 4. 13..
 */
@ContextConfiguration(classes = [RepositoryConfig.class])
class DataBaseConnectionGroovyTest extends Specification {
    @Autowired
    DataSource dataSource;

    def "데이터베이스 인설트 테스트"() {
        setup:
        def connection = dataSource.getConnection();
        def preparedStatement = connection.prepareStatement("INSERT INTO toby.USERS VALUES(?,?,?)");
        preparedStatement.setString(1,"testId");
        preparedStatement.setString(2,"testName");
        preparedStatement.setString(3,"testPassword");

        def resultLowCount = preparedStatement.executeUpdate();

        preparedStatement.close();
        connection.close();

        expect:
        Assert.assertEquals(resultLowCount, 1);
    }
//    def "aa"(){
//        expect: 1==1;
//    }
}