package com.dbic.catalogApi.service;

import com.dbic.catalogApi.model.Catalog;

import java.util.List;

public interface CatalogService {
    Catalog saveCatalog(Catalog catalog);

    List<Catalog> getAllCatalog();

    Catalog getCatalogById(Long id);

    boolean deleteCatalog(Long id);

    Catalog updateCatalog(Long id, Catalog catalog);
}
