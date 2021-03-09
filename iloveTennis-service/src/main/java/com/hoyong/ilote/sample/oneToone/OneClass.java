package com.hoyong.ilote.sample.oneToone;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class OneClass {

    @EmbeddedId
    EmbeddedPrimaryKey embeddedPrimaryKey;

    private String test2;
}
