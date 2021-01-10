package com.hoyong.ilote.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.metamodel.Type;

public class RepositoryRestConfig implements RepositoryRestConfigurer {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.getCorsRegistry()
                .addMapping("/**")
                .allowedMethods("GET","POST","PUT","HEAD","DELETE");;
        /*config.exposeIdsFor(
                entityManager.getMetamodel().getEntities().stream()
                        .map(e -> e.getJavaType())
                        .collect(Collectors.toList())
                        .toArray(new Class[0])
        );*/
        config.exposeIdsFor(
                entityManager.getMetamodel().getEntities().stream()
                        .map(Type::getJavaType).toArray(Class[]::new)
        );
    }
}
