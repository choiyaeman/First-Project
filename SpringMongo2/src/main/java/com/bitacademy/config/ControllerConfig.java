package com.bitacademy.config;

import com.bitacademy.controllers.DockerCheckController;
import com.bitacademy.controllers.JsonTestController;
import com.bitacademy.controllers.LoginController;
import com.bitacademy.controllers.MemberJoinController;
import com.bitacademy.controllers.MemberModifyController;
import com.bitacademy.controllers.WebRestControllerAdvice;
import com.bitacademy.services.data.DataSelectService;
import com.bitacademy.services.member.MemberDeleteService;
import com.bitacademy.services.member.MemberRegisterService;
import com.bitacademy.services.member.MemberSearchService;
import com.bitacademy.services.member.ModifyPasswordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(ServiceConfig.class)
public class ControllerConfig {

    @Autowired
    private MemberRegisterService memberRegisterSvc;
    @Autowired
    private MemberSearchService memberSearchSvc;
    @Autowired
    private ModifyPasswordService modifyPasswordSvc;
    // @Autowired
    // private MemberDeleteService memberDeleteSvc;

    // test
    @Autowired
    private DataSelectService dataSelectSvc;

    // test
    @Bean
    public JsonTestController jsontest() {
        return new JsonTestController(memberSearchSvc, dataSelectSvc);
    }

    @Bean
    public MemberJoinController memberJoinController() {
        return new MemberJoinController(memberRegisterSvc);
    }

    @Bean
    public MemberModifyController memberModifyController() {
        return new MemberModifyController(modifyPasswordSvc);
    }

    @Bean
    public LoginController loginController() {
        return new LoginController(memberSearchSvc);
    }

    @Bean
    public WebRestControllerAdvice webRestControllerAdvice() {
        return new WebRestControllerAdvice();
    }

    @Bean
    public DockerCheckController checkDocker() {
        return new DockerCheckController();
    }

}