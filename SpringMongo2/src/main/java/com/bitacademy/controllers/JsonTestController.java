package com.bitacademy.controllers;

import java.util.List;

import com.bitacademy.services.data.DataSelectService;
import com.bitacademy.services.member.MemberSearchService;
import com.bitacademy.vo.DataVO;
import com.bitacademy.vo.MemberVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
// @CrossOrigin("http://localhost:3000")
public class JsonTestController {

    @Autowired
    private MemberSearchService memberSearchService;
    @Autowired
    private DataSelectService dataSelectService;

    public JsonTestController(MemberSearchService memberSearchService, DataSelectService dataSelectService) {
        this.memberSearchService = memberSearchService;
        this.dataSelectService = dataSelectService;
    }

    // 기본적으로 xml형태로 리턴한다 (URL에 확장자.json을 붙이면 json 형태로 보인다)
    // produces="application/json", comsumes="application/json"
    // @RequestMapping(value="/sampleVO", produces=
    // {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE})
    // @PostMapping(@value="", comsumes=)

    @RequestMapping(path = "/react", method = { RequestMethod.GET, RequestMethod.POST }, produces = {
            MediaType.APPLICATION_JSON_VALUE })
    public MemberVO react(Model model, @RequestParam("id") String id, RedirectAttributes rttr) {
        // model.addAttribute("member", memberSearchService.searchMember(id));
        return memberSearchService.searchMemberById(id);
    }

    @CrossOrigin
    @RequestMapping(path = "/react2", method = { RequestMethod.GET }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public List<MemberVO> react2() {
        return memberSearchService.searchMembersAll();
    }

    // @RequestMapping(path="/memberList", method={RequestMethod.GET,
    // RequestMethod.POST}, produces= {MediaType.APPLICATION_JSON_VALUE})
    // public MemberVO memberList(@RequestParam("id") String id){
    // MemberVO member = memberSearchService.searchMember(id);
    // return member;
    // }

    @GetMapping(path = "/selectTest")
    public List<DataVO> selectTest() {
        return dataSelectService.selectDataAll();
    }

    // produces = { "application/json", "application/xml" }
    @RequestMapping(path = "/randomSelect", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public DataVO randomSelect() {
        return dataSelectService.selectRandomData();
    }

}