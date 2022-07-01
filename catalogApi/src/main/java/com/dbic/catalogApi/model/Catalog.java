package com.dbic.catalogApi.model;

public class Catalog {

    private long id;    
    private String title;
    private String img;
    private String shortDesc;
    private Integer price;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
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


    public Catalog(long id, String title, String img, String shortDesc, Integer price) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.shortDesc = shortDesc;
        this.price = price;
    }

    public Catalog() {
    }
}
