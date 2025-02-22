package com.nillo.backend.solr;

import org.apache.solr.client.solrj.beans.Field;

public class TechProduct {

    @Field public String id;
    @Field public String name;

    public TechProduct(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public TechProduct() {}
}