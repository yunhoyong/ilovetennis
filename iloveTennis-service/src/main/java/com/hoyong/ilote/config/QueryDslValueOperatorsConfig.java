package com.hoyong.ilote.config;


import org.bitbucket.gt_tech.spring.data.querydsl.value.operators.experimental.QuerydslPredicateArgumentResolverBeanPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.querydsl.binding.QuerydslBindingsFactory;

@Configuration
@Order(Ordered.LOWEST_PRECEDENCE)
public class QueryDslValueOperatorsConfig {

    @Bean
    public QuerydslPredicateArgumentResolverBeanPostProcessor querydslPredicateArgumentResolverBeanPostProcessor(
            QuerydslBindingsFactory factory) {
        return new QuerydslPredicateArgumentResolverBeanPostProcessor(factory);
    }
}