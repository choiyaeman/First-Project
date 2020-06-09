package com.bitacademy.controllers;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bitacademy.vo.MemberVO;
import com.bitacademy.exception.MemberNotFoundException;
import com.bitacademy.exception.WrongPasswordException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/*
	// @RestController를 사용한 모든 controller 대상 
	@ControllerAdvice(annotations = RestController.class) 
	public class ExampleAdvice1 {} 
	
	// 해당 패키지 내 모든 controller 대상 
	@ControllerAdvice("org.example.controllers") 
	public class ExampleAdvice2 {} 
	
	// 해당 클래스 하위로 구현된 controller 대상 
	@ControllerAdvice(assignableTypes = {ControllerInterface.class, AbstractController.class}) 
	public class ExampleAdvice3 {}
	
	------------------------------------------------------------------------
	@ControllerAdvice의 속성들
	value, basePackages 타입=String[]						 	<-공통 설정을 적용할 컨트롤러가 속하는 기준 패키지
	annotations			타입=Class<? extends Annotation>[] 	<-특정 애너테이션이 적용된 컨트롤러 대상
	assignableTypes		타입=Class<?>[]						<-특정 타입 또는 그 하위 타입인 컨트롤러 대상
 */


//ControllerAdvice를 적용한 클래스가 동작하려면 해당 클래스를 스프링에 빈으로 등록해야 한다

@RestControllerAdvice("com.bitacademy.controllers")
public class WebRestControllerAdvice {
    
    @ExceptionHandler(value={MemberNotFoundException.class, WrongPasswordException.class})
    public ResponseEntity<MemberVO> handleException (){
        MemberVO member=new MemberVO();
        member.setId("err");
        member.setPassword("err");
        member.setName("err");
        member.setPhone("err");
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }

    

}