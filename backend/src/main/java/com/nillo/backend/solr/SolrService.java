package com.nillo.backend.solr;

import com.nillo.backend.core.book.Book;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Slf4j
@Service
public class SolrService {

    @Value("${spring.solr.host}")
    private String host;
    private RestClient restClient;

    public SolrService() {
        this.restClient = RestClient.create();
    }

    public void addBook(Book book) {

        String body = ("""
                        [
                          {
                            "title" : %s,
                            "isbn" : %s,
                            "authorName" : %s,
                            "synopsis" : %s
                          }
                        ]
                        """).formatted(book.getTitle(), book.getIsbn(), book.getAuthorName(), book.getSynopsis());

        ResponseEntity<Void> response = restClient.post()
                .uri(host + "/update?commitWithin=1000")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }

    public void deleteALl() {
        ResponseEntity<Void> response = restClient.post()
                .uri(host + "/update?commitWithin=1000")
                .contentType(MediaType.APPLICATION_JSON)
                .body("{'delete': {'query': '*:*'}}")
                .retrieve()
                .toBodilessEntity();
    }

    public void createShema() {
        ResponseEntity<Void> response = restClient.post()
                .uri(host + "/update?commitWithin=1000")
                .contentType(MediaType.APPLICATION_JSON)
                .body("""
                        {
                          "add-field": [
                            {
                              "name": "title",
                              "type": "string",
                              "stored": true
                            },
                            {
                              "name": "isbn",
                              "type": "string",
                              "stored": true
                            },
                            {
                              "name": "authorName",
                              "type": "string",
                              "stored": true
                            },
                            {
                              "name": "synopsis",
                              "type": "text_general",
                              "stored": true
                            }
                          ]
                        }
                        """)
                .retrieve()
                .toBodilessEntity();
    }
}