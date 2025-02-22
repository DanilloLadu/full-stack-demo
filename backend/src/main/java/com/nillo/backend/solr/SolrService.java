package com.nillo.backend.solr;

import com.nillo.backend.core.book.Book;
import lombok.extern.slf4j.Slf4j;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpJdkSolrClient;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class SolrService {

    @Value("${spring.solr.host}")
    private String host;

    private SolrClient getSolrClient() {
        return new HttpJdkSolrClient.Builder(this.host).build();
    }

    public void addBook(Book book) {

        final UpdateResponse response;

        try (SolrClient solrClient = getSolrClient()){
            response = solrClient.addBean(book);
            solrClient.commit();
            log.debug("Adding to Solr: {}", response);
        } catch (IOException | SolrServerException e) {
            throw new RuntimeException(e);
        }
    }
}