package com.nillo.backend.solr;

import com.nillo.backend.core.book.Book;
import com.nillo.backend.core.book.BookRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("solr")
@RequiredArgsConstructor
@Tag(name = "Solr")
public class SolrController {

    private final BookRepository bookRepository;
    private final SolrService solrService;

    @GetMapping("/reindex")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> reindex() {
        solrService.deleteALl();
        List<Book> books = bookRepository.findAll();
        Executors.newSingleThreadExecutor().execute(new Runnable() {
            @Override
            public void run() {
                for (Book book : books){
                    solrService.addBook(book);
                }
            }
        });

        return ResponseEntity.accepted().build();
    }



}