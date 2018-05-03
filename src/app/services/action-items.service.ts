import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ActionItemsService {
  private urlJson = 'assets/json/';
  constructor(private http: HttpClient) { }
  // data list action items
  getAllData() {
    return this.http.get(this.urlJson + 'list-action-items.json')
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
    return this.http.get(this.urlJson + 'column-option-actions.json')
      .toPromise()
      .catch(this.handleError);
  }

  // data action popup
  getDataActionPopup() {
    return this.http.get(this.urlJson + 'data-add-action.json')
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
