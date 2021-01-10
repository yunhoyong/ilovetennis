package com.hoyong.ilote.match;

import com.hoyong.ilote.person.Person;
import com.hoyong.ilote.stadium.Stadium;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface MatchRepository extends CrudRepository<Match, Long>,PagingAndSortingRepository<Match, Long> {
    List<Match> findAllMatchByTitle(String title);

    List<Match> findAllMatchByContents(String contents);
}
