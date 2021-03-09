package com.hoyong.ilote.sample.oneToone;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@NoArgsConstructor
@Data
@Embeddable
@AllArgsConstructor
public class EmbeddedPrimaryKey implements Serializable {
    private String pk1;

    private String pk2;

    private String pk3;

}
