package com.hoyong.ilote.stadium;

public enum CourtType {
    하드("H")

    ,클레이("C")

    ,인조잔디("G")

    ,앙투앙("A");

    private String code;

    CourtType(String code){
        this.code = code;
    }
}