package com.bitacademy.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DockerCheckController {

    @GetMapping("/connectDocker")
    public String connectDocker() {
        return "/WEB-INF/views/docker.jsp";
    }

}