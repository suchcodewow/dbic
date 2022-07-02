package com.dbic.catalogApi.entity;

import javax.persistence.*;

@Entity
@Table(name = "catalog")
public class CatalogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; 
    private String category;   
    private String title;
    private String img;
    private String shortDesc;
    private Integer price;

    public CatalogEntity() {
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getImg() {
        return img;
    }
    public void setImg(String img) {
        this.img = img;
    }
    public String getShortDesc() {
        return shortDesc;
    }
    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    
    public CatalogEntity(long id, String category, String title, String img, String shortDesc, Integer price) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.img = img;
        this.shortDesc = shortDesc;
        this.price = price;
    }
}
