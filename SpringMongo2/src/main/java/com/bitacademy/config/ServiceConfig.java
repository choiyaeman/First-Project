package com.bitacademy.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.annotation.Configuration;

//여기서 service의 모든 것을 Scan해서 빈으로 등록하고 ControllerConfig에서  @Import(ServiceConfig.class)
@Configuration
@ComponentScans( value = {
    @ComponentScan(basePackages = {"com.bitacademy.services.member"}),
    @ComponentScan(basePackages = {"com.bitacademy.services.data"})})
public class ServiceConfig {
    
}