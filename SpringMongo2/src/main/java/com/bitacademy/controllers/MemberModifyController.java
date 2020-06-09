package com.bitacademy.controllers;

import com.bitacademy.services.member.ModifyPasswordService;
import com.bitacademy.vo.MemberModifyRequest;
import com.bitacademy.vo.MemberVO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberModifyController {
    
    private ModifyPasswordService modifyPasswordService;

    public MemberModifyController(ModifyPasswordService modifyPasswordService) {
        this.modifyPasswordService = modifyPasswordService;
    }
    

    @RequestMapping(path="/member/modifypassword", method={RequestMethod.POST, RequestMethod.PUT})
    // ResponseEntity는 @RestController 안에서 사용해주자
    public ResponseEntity<MemberVO> modifyPassword(@RequestBody MemberModifyRequest modifyRequest){
        MemberVO member=null;
        member=modifyPasswordService.modifyPassword(modifyRequest.getId(), modifyRequest.getPreviousPassword(), modifyRequest.getNewPassword());
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }

    

}