import {Component, OnInit} from '@angular/core';
import {BookResponse} from '../../../../services/books/model/book-response';
import {BookService} from '../../../../services/books/book.service';
import {Router, RouterLink} from '@angular/router';
import {PageResponseBookResponse} from '../../../../services/books/model/page-response-book-response';
import {BookCardComponent} from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-my-books',
  imports: [
    BookCardComponent,
    RouterLink
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.less'
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findOwnBooks(this.page, this.size)
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
          this.pages = Array(this.bookResponse.totalPages)
            .fill(0);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus(book.id as number).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }

  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus(book.id as number
    ).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }
}
