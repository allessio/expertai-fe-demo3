import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/expertai/api/contents';
const httpHeaders: HttpHeaders = new HttpHeaders({
  'Access-Control-Allow-Origin': 'http://localhost:8080'
});
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
    return this.http.get(`${baseUrl}/all`, { headers: httpHeaders });
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, { headers: httpHeaders });
  }

  // create(data): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // update(id, data): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  findById(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, { headers: httpHeaders }).pipe(catchError(this.handleError), tap(
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

  // public sendGetRequestToUrl(url: string){
  //   return this.http.get(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
  //     console.log(res.headers.get('Link'));
  //     this.parseLinkHeader(res.headers.get('Link'));

  //   }));
  // }
}
