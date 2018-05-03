import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LotoService {
  private urlJson = 'assets/json/';
  constructor(private http: HttpClient) { }
  // data list loto items
  getDataLotoItems() {
    return this.http.get(this.urlJson + 'list-item-loto.json')
      .toPromise()
      .catch(this.handleError);
  }

  // data filter
  getDataFilterLotoItems() {
    return this.http.get(this.urlJson + 'filter-loto.json')
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
