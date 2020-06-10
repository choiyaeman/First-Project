package com.bitacademy.services.member;

import com.bitacademy.config.MongoConfig;
import com.bitacademy.vo.MemberVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service("memberDeleteService")
@Import(value={MongoConfig.class})
public class MemberDeleteService {
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public MemberVO deleteMember(String id){
        Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
        MemberVO member=mongoTemplate.findAndRemove(query, MemberVO.class, "member");
        return member;
    }
    
}