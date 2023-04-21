package com.hoyong.ilote.person;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 *
 */
@RestController
@RequestMapping(value = "/person")
@Slf4j
@RequiredArgsConstructor
public class PersonController {

    private final PersonRepository personRepository;

    // 생성
    @PostMapping("/person")
    public ResponseEntity<?> savePerson(@RequestBody Person person) {
        Person savedPerson = personRepository.save(person);
        return ResponseEntity.ok(savedPerson);
    }

    // 목록 조회
    @GetMapping("/person")
    public List<Person> all() {
        return personRepository.findAll();
    }

    // 단건 조회
    @GetMapping("/person/{id}")
    public Person getPerson(@PathVariable Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("illegal argument :" + id));
    }

    // 수정
    @PutMapping("/{id}")
    public Person updatePerson(@PathVariable Long id, @RequestBody Person newPerson) {
        return personRepository.findById(id)
                .map(Person -> {
                    Person.setName(newPerson.getName());
                    return personRepository.save(Person);
                })
                .orElseGet(() -> {
                    newPerson.setId(id);
                    return personRepository.save(newPerson);
                });
    }

    // 삭제
    @DeleteMapping("/{id}")
    public void deletePerson(@PathVariable Long id) {
        personRepository.deleteById(id);
    }
}
