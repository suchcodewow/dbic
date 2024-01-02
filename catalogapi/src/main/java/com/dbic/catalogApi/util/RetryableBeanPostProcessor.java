package com.dbic.catalogApi.util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Slf4j
@Order(value = Ordered.HIGHEST_PRECEDENCE)
@Component
public class RetryableBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof DataSource) {
            log.info (" configuring a retryable datasource for beanName = {}", beanName);
            return new RetryableDatasource((DataSource) bean);
        }
        return bean;
    }
    
}
