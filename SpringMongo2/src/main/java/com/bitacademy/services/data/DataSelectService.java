package com.bitacademy.services.data;

import java.util.List;

import com.bitacademy.config.MongoConfig;
import com.bitacademy.vo.DataVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service("dataSelectService")
@Import(value = { MongoConfig.class })
public class DataSelectService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    // public <T> List<T> findAll(Class<T> entityClass, String collectionName)
    public List<DataVO> selectDataAll() {
        return mongoTemplate.findAll(DataVO.class, "data");
    }

    public DataVO selectRandomData() {
        List<DataVO> list = mongoTemplate.findAll(DataVO.class, "data");
        int randNumber = (int) (Math.random() * list.size());
        return list.get(randNumber);
    }

}