import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable()
export class SlackApiService extends DataService {
  constructor(http: Http) {
     super('https://slack.com/api/oauth.access', http);
  }
}
