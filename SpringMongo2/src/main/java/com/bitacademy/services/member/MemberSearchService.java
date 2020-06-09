package com.bitacademy.services.member;

import java.util.List;

import com.bitacademy.config.MongoConfig;
import com.bitacademy.exception.MemberNotFoundException;
import com.bitacademy.vo.MemberVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service("memberSearchService")
@Import(value={MongoConfig.class})
public class MemberSearchService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public MemberVO searchMemberById(String id){
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        MemberVO member = mongoTemplate.findOne(query, MemberVO.class, "member");
        if(member==null){
            throw new MemberNotFoundException();
        }
        return member;
    }

    public List<MemberVO> searchMembersAll(){
        return mongoTemplate.findAll(MemberVO.class, "member");
    }
    

}