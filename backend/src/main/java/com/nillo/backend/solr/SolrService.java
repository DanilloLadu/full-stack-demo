package com.nillo.backend.solr;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.Http2SolrClient;
import org.apache.solr.client.solrj.impl.HttpJdkSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SolrService {

    @Value("${spring.solr.host}")
    private String host;

    private SolrClient getSolrClient() {
        return new HttpJdkSolrClient.Builder(this.host).build();
    }

    public void addBook() throws SolrServerException, IOException {

        final SolrClient solrClient = getSolrClient();

        // Create a new document
//        SolrInputDocument document = new SolrInputDocument();
//        document.addField("id", "1");
//        document.addField("title", "A Sample Document");
//        document.addField("author", "John Doe");
//
//        // Add the document to Solr
//        UpdateResponse response = solrClient.add(document);
//        System.out.println("Document add response: " + response);
//
//        // Commit the changes to make the document searchable
//        solrClient.commit();
//        System.out.println("Commit successful.");

        final TechProduct kindle = new TechProduct("kindle-id-2", "Amazon Kindle Paperwhite");
        final UpdateResponse response = solrClient.addBean( kindle);
        System.out.println(response);
        solrClient.commit();
    }
}