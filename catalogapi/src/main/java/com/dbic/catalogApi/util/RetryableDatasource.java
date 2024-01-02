package com.dbic.catalogApi.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.AbstractDataSource;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Slf4j
@RequiredArgsConstructor
public class RetryableDatasource extends AbstractDataSource {

    private final DataSource dataSource;

    @Override
    @Retryable(maxAttempts = 100, backoff = @Backoff(multiplier = 1.3, maxDelay = 60000))
    public Connection getConnection() throws SQLException{
        log.info("getting connection...");
        return dataSource.getConnection();
    }

    @Override
    @Retryable(maxAttempts = 100, backoff = @Backoff(multiplier = 1.3, maxDelay = 60000))
    public Connection getConnection(String username, String password) throws SQLException {
        log.info("getting connection by username and password...");
        return dataSource.getConnection(username, password);
    }
    
}
