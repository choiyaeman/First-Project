package com.bitacademy.services.member;

import java.sql.SQLException;

import com.bitacademy.config.MongoConfig;
import com.bitacademy.exception.MemberNotFoundException;
import com.bitacademy.exception.WrongPasswordException;
import com.bitacademy.vo.MemberVO;
import com.mongodb.client.result.UpdateResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("modifyPasswordService")
@Import(value={MongoConfig.class})
public class ModifyPasswordService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Transactional(rollbackFor={SQLException.class})
    public MemberVO modifyPassword(String id, String oldPassword, String newPassword){
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        MemberVO member=mongoTemplate.findOne(query, MemberVO.class, "member");
        if(member==null){
            throw new MemberNotFoundException();
        }else if(!oldPassword.equals(member.getPassword())){
            throw new WrongPasswordException(); //id는 맞췄는데 기존 비밀번호를 잘못 입력했을 때
        }


        member.setPassword(newPassword);
        // mongoTemplate.save(member, "member"); //id값이 이미 있으면 update하고, 없으면 insert 한다
        Update update = new Update();
        member.setPassword(newPassword); // 비밀번호 변경(리턴할 객체)
        update.set("password", newPassword); // 비밀번호 변경(DB에 들어갈 객체)
        UpdateResult result=mongoTemplate.updateMulti(query, update, MemberVO.class);
        // mongoTemplate.updateFirst(query, update, MemberVO.class);
        return member;
    }
}