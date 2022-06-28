package com.dbic.catalogApi.model;
import java.sql.Timestamp;

public class Catalog {

    private long id;    
    private String title;
    private String img;
    private String shortDesc;
    private Timestamp createDate;
    private Timestamp updateDate;

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
    public String getCreateDate() {
        return createDate;
    }
    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }
    public String getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public Catalog(long id, String title, String img, String shortDesc, String createDate, String updateDate) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.shortDesc = shortDesc;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public Catalog() {
    }
}
