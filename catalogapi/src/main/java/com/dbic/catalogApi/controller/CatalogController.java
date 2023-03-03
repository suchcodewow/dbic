package com.dbic.catalogApi.controller;

import com.dbic.catalogApi.model.Catalog;
import com.dbic.catalogApi.service.CatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dbic.catalogApi.util.AppConstants;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CatalogController {

    private final CatalogService CatalogService;

    public CatalogController(CatalogService CatalogService) {
        this.CatalogService = CatalogService;
    }

    @PostMapping("/catalog")
    public Catalog saveCatalog(@RequestBody Catalog Catalog) {
        return CatalogService.saveCatalog(Catalog);
    }

    @GetMapping("/catalog")
    public List<Catalog> getAllCatalog(
        @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
        @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
        @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
        @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ) {
        return CatalogService.getAllCatalog(pageNo, pageSize, sortBy, sortDir);
    }

    @GetMapping("/catalog/{id}")
    public ResponseEntity<Catalog> getCatalogById(@PathVariable("id") Long id) {
        Catalog Catalog = null;
        Catalog = CatalogService.getCatalogById(id);
        return ResponseEntity.ok(Catalog);
    }

    @DeleteMapping("/catalog/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable("id") Long id) {
        boolean deleted = false;
        deleted =CatalogService.deleteCatalog(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/catalog/{id}")
    public ResponseEntity<Catalog> updateCatalog(@PathVariable("id") Long id,
        @RequestBody Catalog Catalog) {
        Catalog = CatalogService.updateCatalog(id,Catalog);
        return ResponseEntity.ok(Catalog);
    }

}
