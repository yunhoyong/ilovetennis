package com.hoyong.ilote.person;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
public class Person {

    /**
     * Key 값
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    /**
     * 이름
     */
    private String name;

    /**
     * 나이
     */
    private Integer age;

    /**
     * ntrp
     */
    private double ntrpLevel;

    /**
     * 구력
     */
    private double tennisCareer;

    /**
     * 기타
     */
    private String etc;
}