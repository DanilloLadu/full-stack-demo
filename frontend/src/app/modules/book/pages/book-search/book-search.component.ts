import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../../services/books/book.service';
import {BookResponse} from '../../../../services/books/model/book-response';
import {BookCardComponent} from '../../components/book-card/book-card.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-search',
  imports: [
    BookCardComponent
  ],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.less'
})
export class BookSearchComponent implements OnInit {
  bookResponse: BookResponse[] = new Array<BookResponse>();

  ngOnInit() {
    const search = this.activeRoute.snapshot.queryParams['q'];
    this.bookService.searchSolrTitle(search, 'title').subscribe(
      {
        next: (resp) => {
          console.log(resp.facet_counts.facet_fields)
          resp.response.docs.forEach((book: BookResponse) => {
            this.bookResponse.push({
              title: book.title,
              isbn: book.isbn,
              authorName: book.authorName,
              synopsis: book.synopsis
            })
          })
        }
      }
    );
  }


  constructor(private bookService: BookService, private activeRoute: ActivatedRoute) {
console.log('Book Search Component');
  }
}
