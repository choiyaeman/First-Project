package com.bitacademy.controllers;

import javax.servlet.http.HttpSession;

import com.bitacademy.services.member.MemberSearchService;
import com.bitacademy.vo.MemberVO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/member")
public class LogoutController {
    
    private MemberSearchService memberSearchService;

    public LogoutController(MemberSearchService memberSearchService) {
        this.memberSearchService = memberSearchService;
    }

    @RequestMapping(path="/logout", method={RequestMethod.POST})
    public ResponseEntity<MemberVO> logout(@RequestParam("id") String id, HttpSession session, RedirectAttributes rttr){
        //다시 맨 처음 페이지로 리다이렉트
        return null;
    }

}