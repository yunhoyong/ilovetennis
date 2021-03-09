package com.hoyong.ilote.person;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


/**
 *
 */
@RestController
@RequestMapping(value = "/api")
@Slf4j
public class PersonController {

    @GetMapping("/test")
    public @ResponseBody
    Person findById() {
        log.debug("Test");
        return new Person();
    }
}
