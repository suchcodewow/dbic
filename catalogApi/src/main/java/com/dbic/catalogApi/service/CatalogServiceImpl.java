package com.dbic.catalogApi.service;

import com.dbic.catalogApi.entity.CatalogEntity;
import com.dbic.catalogApi.model.Catalog;
import com.dbic.catalogApi.repository.CatalogRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatalogServiceImpl implements CatalogService{

    private CatalogRepository catalogRepository;

    public CatalogServiceImpl(CatalogRepository catalogRepository) {
        this.catalogRepository = catalogRepository;
    }

    @Override
    public Catalog saveCatalog(Catalog catalog) {
        CatalogEntity catalogEntity = new CatalogEntity();
        BeanUtils.copyProperties(catalog, catalogEntity);
        catalogRepository.save(catalogEntity);
        return catalog;
    }

    @Override
    public List<Catalog> getAllCatalog() {
        List<CatalogEntity> catalogEntities
                = catalogRepository.findAll();

        List<Catalog> catalogs = catalogEntities
                .stream()
                .map(catalogEntity -> new Catalog(
                    catalogEntity.getId(),
                    catalogEntity.getTitle(),
                    catalogEntity.getImg(),
                    catalogEntity.getShortDesc(),
                    catalogEntity.getCreateDate(),
                    catalogEntity.getUpdateDate()
                ))
                .collect(Collectors.toList());

        return catalogs;
    }

    @Override
    public Catalog getCatalogById(Long id) {
        CatalogEntity catalogEntity
                = catalogRepository.findById(id).get();
        Catalog catalog = new Catalog();
        BeanUtils.copyProperties(catalogEntity, catalog);
        return catalog;
    }

    @Override
    public boolean deleteCatalog(Long id) {
        CatalogEntity catalog =  catalogRepository.findById(id).get();
        catalogRepository.delete(catalog);
        return true;
    }

    @Override
    public Catalog updateCatalog(Long id, Catalog catalog) {
        CatalogEntity catalogEntity =
        catalogRepository.findById(id).get();
        catalogEntity.setTitle(catalog.getTitle());
        catalogEntity.setImg(catalog.getImg());
        catalogEntity.setShortDesc(catalog.getShortDesc());
        catalogEntity.setCreateDate(catalog.getCreateDate());
        catalogEntity.setUpdateDate(catalog.getUpdateDate());

        catalogRepository.save(catalogEntity);
        return catalog;
    }

}

