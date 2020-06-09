package com.bitacademy.config;

import com.mongodb.MongoClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoAuditing
// @PropertySource({ "classpath:db.properties", "classpath:/db.properties" })
@EnableMongoRepositories(basePackages = { "com.bitacademy.repositories" })
public class MongoConfig extends AbstractMongoConfiguration {

    // @Value("${spring.data.mongodb.host}")
    private String databaseHost = "172.18.0.2";
    // @Value("${spring.data.mongodb.port}")
    private Integer databasePort = Integer.valueOf("27017");
    // @Value("${spring.data.mongodb.database}")
    private String databaseName = "spring";

    @Autowired
    Environment env; // env.getProperty("spring.data.mongodb.uri") 또는 @Value("${mongodb.url}")

    @Bean
    @Override
    public MongoClient mongoClient() {
        return new MongoClient(databaseHost, databasePort); // "127.0.0.1", 27017
    }

    @Override
    protected String getDatabaseName() {
        return this.databaseName;
    }

    @Bean(name = { "mongoTemplate", "sqlSessionTemplate" })
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), databaseName);
    }

    /*
     * MongoTemplate은 Deprecated 되었으므로 MongoRepository 방법을 사용하자
     * 
     * MongoTemplate의 메서드
     * =============================================================================
     * ===== 1) insert(user, "user"); <- 삽입 2) save(user, "user"); <- id값이 이미 있으면
     * update하고, 없으면 insert 한다 3) updateFirst(query, update, User.class); <- 주어진
     * query와 일치하는 가장 맨 처음 document를 update한다
     * 
     * Query query = new Query();
     * query.addCriteria(Criteria.where("name").is("Alex")); Update update = new
     * Update(); update.set("name", "James"); mongoTemplate.updateFirst(query,
     * update, User.class);
     * 
     * 4) updateMulti(query, update, User.class); <- 주어진 query와 일치하는 모든 document를
     * update한다. Query query = new Query();
     * query.addCriteria(Criteria.where("name").is("Eugen")); Update update = new
     * Update(); update.set("name", "Victor"); mongoTemplate.updateMulti(query,
     * update, User.class);
     * 
     * 5) findAndModify(query, update, User.class); <- updateMulti와 같지만 update되기 전의
     * 객체를 리턴한다 6) upsert(query, update, User.class); <- 일치하는 document가 있으면 update하고
     * 없으면 insert 한다. 7) remove(user, "user"); 8) findOne, findAll 등 오라클 문서 찾아보기 9)
     * findAndRemove(Query query, Class<T> entityClass, String collectionName)
     * 
     */
}