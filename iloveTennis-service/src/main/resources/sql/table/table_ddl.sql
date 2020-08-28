CREATE TABLE `notice` (
  `SEQ` bigint(20) NOT NULL DEFAULT 0 COMMENT 'Seq',
  `CREATE_DTIM` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '생성일시',
  `UPDATE_DTIM` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정 일시',
  `notice_title` varchar(100) DEFAULT NULL,
  `notice_contents` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;