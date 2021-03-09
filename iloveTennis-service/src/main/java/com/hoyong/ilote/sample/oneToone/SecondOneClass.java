package com.hoyong.ilote.sample.oneToone;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class SecondOneClass {

    @EmbeddedId
    EmbeddedPrimaryKey embeddedPrimaryKey;

    private String test1;

}
