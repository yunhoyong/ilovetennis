package com.hoyong.ilote.match;


import com.hoyong.ilote.stadium.Stadium;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 사람찾는데에 대한 상세정보
 */
@Entity
@SequenceGenerator(name = "default", sequenceName = "match_seq", allocationSize = 1)
@ToString
@EqualsAndHashCode(of="id")
@Getter
@Setter
@NoArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * 제목
     */
    @ApiModelProperty(value="제목")
    private String title;

    /**
     * 내용
     */
    @ApiModelProperty(value="내용")
    private String contents;

    /**
     * 경기 시작시간
     */
    @ApiModelProperty(value="경기 시작시간")
    private LocalDateTime matchStartTime;

    /**
     * 경기 종료시간
     */
    @ApiModelProperty(value="경기 종료시간")
    private LocalDateTime matchEndtTime;

    /** 필요사항
     * */
    @ApiModelProperty(value="경기 종료시간")
    @AttributeOverride(name="contents", column = @Column(name="requiredContents"))
    @Embedded
    private RequiredThings required;

    private Long stadiumId;
}