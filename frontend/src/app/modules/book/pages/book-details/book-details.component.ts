import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../../services/books/book.service';
import {FeedbackService} from '../../../../services/books/feedback.service';
import {ActivatedRoute} from '@angular/router';
import {BookResponse} from '../../../../services/books/model/book-response';
import {RatingComponent} from '../../components/rating/rating.component';
import {PageResponseFeedbackResponse} from '../../../../services/books/model/page-response-feedback-response';

@Component({
  selector: 'app-book-details',
  imports: [
    RatingComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.less'
})
export class BookDetailsComponent implements OnInit {
  book: BookResponse = {};
  feedbacks: PageResponseFeedbackResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private bookId = 0;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    if (this.bookId) {
      this.bookService.findBookById(this.bookId).subscribe({
        next: (book) => {
          this.book = book;
          this.findAllFeedbacks();
        }
      });
    }
  }

  private findAllFeedbacks() {
    this.feedbackService.findAllFeedbacksByBook(this.bookId, this.page, this.size).subscribe({
      next: (data) => {
        this.feedbacks = data;
      }
     });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.feedbacks.totalPages as number - 1;
  }

}
