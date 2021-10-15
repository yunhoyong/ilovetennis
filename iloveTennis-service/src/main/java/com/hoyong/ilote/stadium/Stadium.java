package com.hoyong.ilote.stadium;

import javax.persistence.*;
import java.util.List;

@Entity
public class Stadium {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String location;

    @ElementCollection
    private List<CourtCount> CourtCountList;
}
