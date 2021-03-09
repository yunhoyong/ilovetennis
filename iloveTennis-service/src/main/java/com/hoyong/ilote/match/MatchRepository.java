package com.hoyong.ilote.match;

import com.hoyong.ilote.person.Person;
import com.hoyong.ilote.stadium.Stadium;
import org.bitbucket.gt_tech.spring.data.querydsl.value.operators.ExpressionProviderFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface MatchRepository extends JpaRepository<Match, Long>
//        , QuerydslPredicateExecutor<Match>, QuerydslBinderCustomizer<QMatch>
{
    /**
     * 제목으로 검색
     * @param pageable 페이지, 정렬 정보
     * @return
     */
//    Page<Match> findAll(Pageable pageable);

//    @Override
//    default void customize(QuerydslBindings bindings, QMatch root) {
//        bindings.bind(root.title).all(ExpressionProviderFactory::getPredicate);
//    }

}
