import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SlackApiService extends DataService {
  constructor(http: HttpClient) {
     super('https://slack.com/api', http);
  }
  getAccessToken(resource) {
    return this.create(resource, '/oauth.access');
  }
}
