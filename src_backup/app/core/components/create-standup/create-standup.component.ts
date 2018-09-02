import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { SlackApiService } from '../../services/slack-api.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-create-standup',
  templateUrl: './create-standup.component.html',
  styleUrls: ['./create-standup.component.css']
})
export class CreateStandupComponent implements OnInit {
  channels: any[];
  fG: FormGroup;
  selectedChannel: string;
  channelInfo;
  usersList: any[];
  usersProfile: any [] = [];
  selectedUserType;
  enableAutoComplete: boolean;
  selectedMembers: any[] = [];

  constructor(private fb: FormBuilder, private service: SlackApiService) {}

  ngOnInit() {
    this.fG = this.fb.group({
      channelsControl: ['', [Validators.required]],
      radioControl: [],
      myControl: []
    });
    this.service.getChannelsList().subscribe(response => {
      this.channels = _.map(response.channels, function(object) {
        return _.pick(object, ['id', 'name']);
      });
      console.log('channels', this.channels);
    });
  }

  onChannelSelection(ev) {
    this.selectedChannel = ev.value;
    Observable.forkJoin([
      this.service.getChannelInfo(this.selectedChannel),
      this.service.getUsersList()
    ]).subscribe(responses => {
      this.channelInfo = responses[0];
      this.usersList = responses[1];
      this.usersProfile = this.getUsersInfo(this.channelInfo.channel.members, this.usersList);
      console.log(this.usersProfile);
    });
  }

  OnUserTypeSelection(ev) {
    this.selectedUserType = ev.value;
    console.log(this.selectedUserType);
    this.enableAutoComplete = (this.selectedUserType === 'all') ? false : true;
  }

  onMemberSelection(ev) {
    this.selectedMembers = ev.value;
    console.log(this.selectedMembers);
  }

  // this will return usersProfile
  getUsersInfo(members, usersList) {
       const users = [];
      _.each(members, (member) => {
        const user = _.find(usersList.members, {id: member, is_bot: false, deleted: false});
        if (user)
          users.push(_.find(usersList.members, {id: member, is_bot: false, deleted: false}));
      });
      return users;
  }
}
