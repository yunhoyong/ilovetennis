package com.hoyong.ilovete.notice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.Page;
import com.hoyong.ilovete.notice.vo.Notice;

@Autowired
private NoticeService noticeservice;

@RestController
@RequestMapping(value = "/notice/api")
public class NoticeApiController {
	@GetMapping("/notice/list")
	public @ResponseBody Page<Notice> getNoticeList(@RequestParam("noticeTitle") String noticeTitle
			,@RequestParam("pageNum") int pageNum
			,@RequestParam("pageSize") int pageSize) {
		Page<Notice> noticeList = new Page<>(pageNum, pageSize); 
		
		return noticeList;
	}
}
