import { Component, OnInit } from '@angular/core';
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
      this.getUsersInfo(this.channelInfo.channel.members, this.usersList);
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

  getUsersInfo(members, usersList) {
      _.each(members, (member) => {
        const user = _.find(usersList.members, {id: member, is_bot: false, deleted: false});
        if (user)
          this.usersProfile.push(_.find(usersList.members, {id: member, is_bot: false, deleted: false}));
      });
  }
}
