package com.bitacademy.repositories;


import java.util.List;

import com.bitacademy.vo.MemberVO;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends MongoRepository<MemberVO, String> {
    
}