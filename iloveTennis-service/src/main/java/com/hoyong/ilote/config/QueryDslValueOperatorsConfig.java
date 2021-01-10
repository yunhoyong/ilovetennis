package com.hoyong.ilote.config;


import com.hoyong.ilote.person.Person;
import org.bitbucket.gt_tech.spring.data.querydsl.value.operators.experimental.QuerydslHttpRequestContextAwareServletFilter;
import org.bitbucket.gt_tech.spring.data.querydsl.value.operators.experimental.QuerydslPredicateArgumentResolverBeanPostProcessor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.querydsl.binding.QuerydslBindingsFactory;

import java.util.HashMap;
import java.util.Map;

@Configuration
@Order(Ordered.LOWEST_PRECEDENCE)
public class QueryDslValueOperatorsConfig {

    @Bean
    public FilterRegistrationBean<QuerydslHttpRequestContextAwareServletFilter> querydslHttpRequestContextAwareServletFilter() {
        FilterRegistrationBean<QuerydslHttpRequestContextAwareServletFilter> bean = new FilterRegistrationBean<QuerydslHttpRequestContextAwareServletFilter>();
        bean.setFilter(new QuerydslHttpRequestContextAwareServletFilter(
                querydslHttpRequestContextAwareServletFilterMappings()));
        bean.setAsyncSupported(false);
        bean.setEnabled(true);
        bean.setName("querydslHttpRequestContextAwareServletFilter");
        // 이 필터가 호출해야하는 URI 패턴
        // bean.setUrlPatterns (Arrays.asList(new String[]{ "/search/*"}));
        bean.setOrder(Ordered.LOWEST_PRECEDENCE);
        return bean;
    }

    private Map<String, Class<?>> querydslHttpRequestContextAwareServletFilterMappings() {
        Map<String, Class<?>> mappings = new HashMap<>();
        mappings.put("/persons", Person.class);
        return mappings;
    }

    /**
     * Note the use of delegate ConversionService which comes handy for types like
     * java.util.Date for handling powerful searches natively with Spring data.
     *
     * @param factory QuerydslBindingsFactory instance
     * @return
     */
    @Bean
    public QuerydslPredicateArgumentResolverBeanPostProcessor querydslPredicateArgumentResolverBeanPostProcessor(
            QuerydslBindingsFactory factory) {
        return new QuerydslPredicateArgumentResolverBeanPostProcessor(factory);
    }
}