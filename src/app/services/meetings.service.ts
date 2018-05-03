import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MeetingsService {
  private urlJson = 'assets/json/';
  constructor(private http: HttpClient) { }
  // data list meetings
  getAllData() {
    return this.http.get(this.urlJson + 'list-meetings.json')
      .toPromise()
      .catch(this.handleError);
  }
  // data filter
  getDataFilter() {
    return this.http.get(this.urlJson + 'filter-action-item.json')
      .toPromise()
      .catch(this.handleError);
  }

  // data column option meetings
  getDataColumnOptions() {
    return this.http.get(this.urlJson + 'column-option-meetings.json')
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
