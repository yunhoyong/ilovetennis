package com.hoyong.ilote.match;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TennisMatchRepository extends JpaRepository<TennisMatch, Long>
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
