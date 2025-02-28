import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../../services/books/book.service';
import {BookResponse} from '../../../../services/books/model/book-response';
import {BookCardComponent} from '../../components/book-card/book-card.component';
import {ActivatedRoute} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs';

@Component({
  selector: 'app-book-search',
  imports: [
    BookCardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.less'
})
export class BookSearchComponent implements OnInit {
  bookResponse: BookResponse[] = new Array<BookResponse>();
  searchControl = new FormControl();
  suggestions: string[] = [];

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
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.bookService.getSpellSuggestions(query))
    ).subscribe((data: any) => {
      const suggestionsData = data.spellcheck?.suggestions;
      this.suggestions = suggestionsData?.length > 0
        ? suggestionsData[1]?.suggestion.map((s: any) => s.word) || []
        : [];
    });
  }
}
