import {Component, OnInit} from '@angular/core';
import {BookRequest} from '../../../../services/books/model/book-request';
import {BookService} from '../../../../services/books/book.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-manage-book',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.less'
})
export class ManageBookComponent implements OnInit {
  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findBookById(bookId as number).subscribe({
        next: (book) => {
          this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          }
        }
      });
    }
  }

  saveBook() {
    this.bookService.saveBook(this.bookRequest).subscribe({
      next: (bookId) => {
        if (this.selectedPicture) {
          this.bookService.uploadBookCoverPicture(bookId as number, this.selectedBookCover).subscribe({
            next: () => {
              this.router.navigate(['/books/my-books']);
            }
          });
        } else {
          this.router.navigate(['/books/my-books']);
        }
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedBookCover = event.target.files[0];

    if (this.selectedBookCover) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedPicture = e.target.result;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }
}
