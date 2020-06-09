package com.bitacademy.services.member;

import com.bitacademy.config.MongoConfig;
import com.bitacademy.exception.DuplicateMemberException;
import com.bitacademy.vo.MemberJoinRequest;
import com.bitacademy.vo.MemberVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service("memberRegisterService")
@Import(value={MongoConfig.class})
public class MemberRegisterService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    
    public MemberRegisterService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public MemberVO registerMember(MemberJoinRequest newMember) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(newMember.getId()));
        boolean existMember=mongoTemplate.exists(query, "member");
        if(existMember){
            throw new DuplicateMemberException();
        }
        MemberVO obj=new MemberVO();
        newMember.setId(newMember.getId());
        newMember.setPassword(newMember.getPassword());
        newMember.setName(newMember.getName());
        newMember.setPhone(newMember.getPhone());

        //DB에 저장
        mongoTemplate.insert(newMember, "member");
        return obj; //등록한 MemberVO 객체를 리턴
    }

}