package com.hoyong.ilote.person;

import org.bitbucket.gt_tech.spring.data.querydsl.value.operators.ExpressionProviderFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface PersonRepository  extends JpaRepository<Person, Long>
        , QuerydslPredicateExecutor<Person>
        , QuerydslBinderCustomizer<QPerson>
{
    @Override
    default void customize(QuerydslBindings bindings, QPerson root) {
        bindings.bind(root.name).all(ExpressionProviderFactory::getPredicate);
    }
}
