package com.hoyong.ilovete.notice.vo;

import lombok.Data;

@Data
public class Notice {
	
	private static long serialVersionUID = 1L;
	
	/** 공지사항 일련번호 */
	private String noticeSerialNumber;
	/** 공지사항 제목 */
	private String noticeTitle;
	/** 공지사항 등급 구분 */
	private String noticeContents;
	private String noticeStartDt;
	private String noticeEndtDt;
	private String noticeYn;
	private String useYn;
	private String regDate;
	private String updDate;
	private String userId;
	private String userName;
	private String noticeConfirmDt;
	private int imtrNoticeCnt;
}
