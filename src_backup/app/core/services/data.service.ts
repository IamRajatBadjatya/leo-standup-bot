import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Response, Http } from '@angular/http';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private url, private http: HttpClient) {}

  getAll(endPoint, params) {
    return this.http
      .get(this.url + endPoint, {
        params: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .map(response => response)
      .catch(this.handleError);
  }

  create(resource, endPoint) {
    return this.http
      .post(this.url + endPoint, resource, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .map(response => response)
      .catch(this.handleError);
  }

  update(resource) {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .map(response => response)
      .catch(this.handleError);
  }

  delete(resource) {
    return this.http
      .delete(this.url + '/' + 375)
      .map(response => response)
      .catch(this.handleError);
  }
  get tokenDetails(): any {
    return JSON.parse(sessionStorage.getItem('tokenDetails'));
  }
  private handleError(error: Response) {
    if (error.status === 400) return Observable.throw(new Error());
    if (error.status === 404) return Observable.throw(new Error());
    return Observable.throw(new Error());
  }
}
