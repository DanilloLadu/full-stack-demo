import {inject, Injectable} from '@angular/core';
import {FeedbackRequest} from './model/feedback-request';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from '../token.service';
import {Observable} from 'rxjs';
import {FeedbackResponse} from './model/feedback-response';
import {PageResponseBookResponse} from './model/page-response-book-response';
import {PageResponseFeedbackResponse} from './model/page-response-feedback-response';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  http: HttpClient = inject(HttpClient);
  tokenService: TokenService = inject(TokenService);
  url: string = 'http://127.0.0.1:8080/api/v1/feedbacks';

  saveFeedback(body: FeedbackRequest ): Observable<number>{
    return this.http.post<number>(this.url , body,  { headers: this.getCustomHeaders()});
  }

  findAllFeedbacksByBook(id : number, page: number, size: number) : Observable<PageResponseFeedbackResponse> {
    return this.http.get<PageResponseFeedbackResponse>(this.url + '/book/'+ id + '?' + page + '&size=' + size, { headers: this.getCustomHeaders()});
  }

  getCustomHeaders(): HttpHeaders {
    let httpheaders = new HttpHeaders();
    httpheaders = httpheaders.append('Content-Type', 'application/json');
    httpheaders = httpheaders.append("Authorization", "Bearer " + this.tokenService.token);
    return httpheaders;
  }

  constructor() {
  }
}
