import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SlackApiService extends DataService {
  constructor(http: HttpClient) {
    super('https://slack.com/api', http);
  }
  getAccessToken(resource) {
    return this.create(resource, '/oauth.access');
  }
  getChannelsList() {
    let Params = new HttpParams();
    Params = Params.append('token', this.tokenDetails.access_token);
    return this.getAll('/channels.list', Params);
  }
  getChannelInfo(channelId) {
    let Params = new HttpParams();
    Params = Params.append('token', this.tokenDetails.access_token);
    Params = Params.append('channel', channelId);
    return this.getAll('/channels.info', Params);
  }
  getUsersList() {
    let Params = new HttpParams();
    Params = Params.append('token', this.tokenDetails.access_token);
    return this.getAll('/users.list', Params);
  }
}
