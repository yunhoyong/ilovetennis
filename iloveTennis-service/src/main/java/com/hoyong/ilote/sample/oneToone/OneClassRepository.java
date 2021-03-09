package com.hoyong.ilote.sample.oneToone;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface OneClassRepository extends CrudRepository<OneClass, EmbeddedPrimaryKey>, PagingAndSortingRepository<OneClass, EmbeddedPrimaryKey> {

}