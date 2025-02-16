import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { PageResponseBookResponse } from './model/page-response-book-response';
import {BookRequest} from './model/book-request';
import {BookResponse} from './model/book-response';
import {PageResponseBorrowedBookResponse} from './model/page-response-borrowed-book-response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http: HttpClient = inject(HttpClient);
  tokenService: TokenService = inject(TokenService);
  url: string = environment.apiUrl + 'books';

  approveReturnBorrowBook( id: number) : Observable<number> {
    return this.http.patch<number>(this.url + '/borrow/return/approve/' + id, '', { headers: this.getCustomHeaders()});
  }

  findAllReturnedBooks( page: number, size: number) : Observable<PageResponseBorrowedBookResponse> {
    return this.http.get<PageResponseBorrowedBookResponse>(this.url + '/returned?page=' + page + '&size=' + size, { headers: this.getCustomHeaders()});
  }

  returnBorrowBook( id: number) : Observable<number> {
    return this.http.patch<number>(this.url + '/borrow/return/' + id, '', { headers: this.getCustomHeaders()});
  }

  findAllBorrowedBooks( page: number, size: number) : Observable<PageResponseBorrowedBookResponse> {
    return this.http.get<PageResponseBorrowedBookResponse>(this.url + '/borrowed?page=' + page + '&size=' + size, { headers: this.getCustomHeaders()});
  }

  uploadBookCoverPicture(id: number, file : any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const httpheaders = new HttpHeaders().set("Authorization", "Bearer " + this.tokenService.token );

    return this.http.post<any>(this.url + '/cover/' + id , formData,  { headers: httpheaders });}

  saveBook(body: BookRequest) : Observable<BookResponse>{
    return this.http.post<BookResponse>(this.url , body,  { headers: this.getCustomHeaders()});
  }

  findBookById(id: number) : Observable<BookResponse>{
    return this.http.get<BookResponse>(this.url + '/' +  id, { headers: this.getCustomHeaders()});
  }

  updateArchivedStatus(id: number) : Observable<PageResponseBookResponse>{
    return this.http.patch<PageResponseBookResponse>(this.url + '/archived/' +  id, '', { headers: this.getCustomHeaders()});
  }

  updateShareableStatus(id: number) : Observable<PageResponseBookResponse>{
    return this.http.patch<PageResponseBookResponse>(this.url + '/shareable/' +  id, '', { headers: this.getCustomHeaders()});
  }

  borrowBook(id: number) : Observable<PageResponseBookResponse>{
    return this.http.post<PageResponseBookResponse>(this.url + '/borrow/' +  id, '', { headers: this.getCustomHeaders()});
  }

  findAllBooks( page: number, size: number) : Observable<PageResponseBookResponse> {
    return this.http.get<PageResponseBookResponse>(this.url + '?page=' + page + '&size=' + size, { headers: this.getCustomHeaders()});
  }

  findOwnBooks( page: number, size: number) : Observable<PageResponseBookResponse> {
    return this.http.get<PageResponseBookResponse>(this.url + '/owner?page=' + page + '&size=' + size, { headers: this.getCustomHeaders()});
  }

  getCustomHeaders() : HttpHeaders{
    let httpheaders = new HttpHeaders();
    httpheaders = httpheaders.append('Content-Type', 'application/json');
    httpheaders = httpheaders.append("Authorization", "Bearer " + this.tokenService.token );
    return httpheaders;
  }

  constructor() { }
}
