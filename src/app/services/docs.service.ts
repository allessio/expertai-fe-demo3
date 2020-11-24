import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/expertai/api/contents';
@Injectable({
  providedIn: 'root'
})
export class DocsService {

  public first = '';
  public prev = '';
  public next = '';
  public last = '';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/all`);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // should we?
  // create(data): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // could be...
  // update(id, data): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // hm...
  // delete(id): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // OMG!
  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  findById(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`).pipe(catchError(this.handleError), tap(
      res => {
        console.log(res);
        console.log(res.headers.get('Link'));
        this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // should be used when BE will start sending us the links section
  parseLinkHeader(header) {
    if (header.length === 0) {
      return;
    }

    const parts = header.split(',');
    const links = {};
    parts.forEach(p => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
  }

}
