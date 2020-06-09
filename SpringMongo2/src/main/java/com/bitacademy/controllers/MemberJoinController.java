package com.bitacademy.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.bitacademy.exception.PasswordAndPasswordConfirmDifferentException;
import com.bitacademy.exception.PhoneRegexNotMatchException;
import com.bitacademy.services.member.MemberRegisterService;
import com.bitacademy.vo.MemberJoinRequest;
import com.bitacademy.vo.MemberVO;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


//RestController는 Controller와 달리 스테레오 타입 애너테이션이 아니라 스캔대상이 아닐 수도 있다.
//MappingJackson2HttpMessageConverter 를 통해서 application/json 컨텐츠 타입을 리턴
//@RestController는 객체(VO,DTO)를 반환하기만 하면, 객체데이터는 application/json 형식의 HTTP ResponseBody에 직접 작성
@RestController
@RequestMapping("/member")
//@CrossOrigin("http://localhost:3000")
public class MemberJoinController {

    private MemberRegisterService memberRegisterService;

    public MemberJoinController(MemberRegisterService memberRegisterService) {
        this.memberRegisterService = memberRegisterService;
    }
    
    //@JSONRequestMapping(value = "/foo", method = RequestMethod.POST)
    @ResponseBody
    @RequestMapping(value="/join", method={RequestMethod.POST, RequestMethod.PUT})
    public MemberVO joinMember(@RequestBody MemberJoinRequest joinRequest){// @RequestBody Map<String, Object> joinRequest
        
        if(!joinRequest.getPassword().equals(joinRequest.getConfirmPassword())) {//비번, 비번확인이 다르면 Exception 발생
			throw new PasswordAndPasswordConfirmDifferentException();
		}
        Pattern p=Pattern.compile("\\d{3}-\\d{3,4}-\\d{4}");//전화번호 정규표현식
		Matcher m=p.matcher(joinRequest.getPhone());
		if(!m.matches()) {
			throw new PhoneRegexNotMatchException();
        }


        MemberVO result = memberRegisterService.registerMember(joinRequest);
        
        return result;
    }

}