import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { PageResponseBookResponse } from './model/page-response-book-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http: HttpClient = inject(HttpClient);
  tokenService: TokenService = inject(TokenService);
  url: string = 'http://127.0.0.1:8080/api/v1/books';

  borrowBook(id: number) : Observable<PageResponseBookResponse>{
    return this.http.post<PageResponseBookResponse>(this.url + '/borrow/' +  id, '', { headers: this.getCustomHeaders()});
  }

  findAllBooks( page: number, size: number) : Observable<PageResponseBookResponse> {

    return this.http.get<PageResponseBookResponse>(this.url + '?page=' + page + '&size=' + size, { headers: this.getCustomHeaders()});
  }
  
  getCustomHeaders() : HttpHeaders{
    let httpheaders = new HttpHeaders();
    httpheaders = httpheaders.append('Content-Type', 'application/json');
    httpheaders = httpheaders.append("Authorization", "Bearer " + this.tokenService.token );
    return httpheaders;
  }

  constructor() { }
}
