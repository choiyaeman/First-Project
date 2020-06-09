package com.bitacademy.controllers;

import java.util.Map;

import javax.servlet.http.HttpSession;

import com.bitacademy.exception.MemberNotFoundException;
import com.bitacademy.exception.WrongPasswordException;
import com.bitacademy.services.member.MemberSearchService;
import com.bitacademy.vo.MemberVO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    
    private MemberSearchService memberSearchService;

    public LoginController(MemberSearchService memberSearchService) {
        this.memberSearchService = memberSearchService;
    }

    // @RequestMapping(path = "/member/loginC", method={RequestMethod.GET, RequestMethod.POST})
    // public ResponseEntity<MemberVO> login(@RequestBody Map<String, Object> loginMember, HttpSession session){
    //     MemberVO member=memberSearchService.searchMemberById(loginMember.get("id")+""); // Exception 처리
    //     if(! member.getPassword().equals(loginMember.get("password")+"")){
    //         throw new WrongPasswordException();
    //     }
    //     session.setAttribute(member.getId(), member); //key=id, value=MemberVO
    //     return ResponseEntity.status(HttpStatus.OK).body(member);

    // }

    @RequestMapping(path = "/member/loginC", method={RequestMethod.GET, RequestMethod.POST})
    public MemberVO login(@RequestBody Map<String, Object> loginMember, HttpSession session){
        MemberVO member=memberSearchService.searchMemberById(loginMember.get("id")+""); // Exception 처리
        if(! member.getPassword().equals(loginMember.get("password")+"")){
            throw new WrongPasswordException();
        }
        session.setAttribute(member.getId(), member); //key=id, value=MemberVO
        return member;

    }

    @ExceptionHandler(value={MemberNotFoundException.class, WrongPasswordException.class})
    public MemberVO handleException (){
        MemberVO member=new MemberVO();
        member.setId("err");
        member.setPassword("err");
        member.setName("err");
        member.setPhone("err");
        return member;

        
        // JSONObject response = new JSONObject();
        // response.put("message", e.getMessage());
        // return new ResponseEntity<String>(response.toString(), HttpStatus.BAD_REQUEST);
        
    }

}