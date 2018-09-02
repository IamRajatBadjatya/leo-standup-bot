import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';
import { SlackApiService } from '../../services/slack-api.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ProjectsService } from '../../services/projects.service';
import { UsersService } from '../../services/users.service';

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
  usersProfile: any[] = [];
  selectedUserType;
  enableAutoComplete: boolean;
  selectedMembers: any[] = [];
  members: any[];
  filteredMembers: Observable<string[]>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  @ViewChild('inputText')
  autoCompleteText: ElementRef;

  constructor(
    private fb: FormBuilder,
    private service: SlackApiService,
    private projectService: ProjectsService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.fG = this.fb.group({
      channelsControl: ['', [Validators.required]],
      radioControl: [],
      memberControl: [],
      questions: this.fb.group({
        yTask: [
          'What did you do yesterday?',
          [Validators.required]
        ],
        tTask: [
          'What will you do today?',
          [Validators.required]
        ],
        blocker: ['Anything blocking your progress?', [Validators.required]]
      }),
      time: ['14:00', [Validators.required]],
      availableDays: this.fb.array([])
    });

    this.service.getChannelsList().subscribe(response => {
      this.channels = _.map(response.channels, function(object) {
        return _.pick(object, ['id', 'name']);
      });
      console.log('channels', this.channels);
    });

    this.filteredMembers = this.fG.get('memberControl').valueChanges.pipe(
      startWith(null),
      map(
        (member: string | null) =>
          member ? this._filter(member) : this.members.slice()
      )
    );
  }

  onChannelSelection(ev) {
    this.selectedChannel = ev.value;
    Observable.forkJoin([
      this.service.getChannelInfo(this.selectedChannel),
      this.service.getUsersList()
    ]).subscribe(responses => {
      this.channelInfo = responses[0];
      this.usersList = responses[1];
      // this.members = this.channelInfo.channel.members;
      this.members = this.getUsersInfo(
        this.channelInfo.channel.members,
        this.usersList
      );
      // this.members = _.map(this.members, 'name');
      console.log(this.members);
    });
  }

  createFormArrayForDays() {
    const arr = this.days.map(day => {
      return this.fb.control(false);
    });
    console.log(this.fb.array(arr));
    return this.fb.array(arr);
  }

  get availableDays() {
    return this.fG.get('availableDays');
  }

  OnUserTypeSelection(ev) {
    this.selectedUserType = ev.value;
    console.log(this.selectedUserType);
    this.enableAutoComplete = this.selectedUserType === 'all' ? false : true;
    if (!this.enableAutoComplete) this.selectedMembers = this.members;
    else this.selectedMembers = [];
  }

  onMemberSelection(ev) {
    this.selectedMembers = ev.value;
    console.log(this.selectedMembers);
  }

  getUsersInfo(members, usersList) {
    const users = [];
    _.each(members, member => {
      const user = _.find(usersList.members, {
        id: member,
        is_bot: false,
        deleted: false
      });
      if (user) users.push(_.pick(user, ['id', 'profile', 'name']));
    });
    return users;
  }

  onDaySelection(event) {
    const availableDays = (<FormArray>(
      this.fG.get('availableDays')
    )) as FormArray;

    if (event.checked) availableDays.push(new FormControl(event.source.value));
    else {
      const i = availableDays.controls.findIndex(
        x => x.value === event.source.value
      );
      availableDays.removeAt(i);
    }
  }

  // methods for chiplist starts here
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add to selectedMembers
    if (_.findIndex(this.selectedMembers, { name: value }) === -1)
      this.selectedMembers.push(_.find(this.members, { name: value.trim() }));

    // Reset the input value
    if (input) input.value = '';
    console.log(this.selectedMembers);
    this.fG.get('memberControl').setValue(null);
  }

  remove(member: string): void {
    const index = this.selectedMembers.indexOf(member);

    if (index >= 0) this.selectedMembers.splice(index, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (
      _.findIndex(this.selectedMembers, { name: event.option.viewValue }) === -1
    )
      this.selectedMembers.push(
        _.find(this.members, { name: event.option.viewValue })
      );
    this.autoCompleteText.nativeElement.value = '';
    this.fG.get('memberControl').setValue(null);
    console.log(this.selectedMembers);
  }

  private _filter(value): string[] {
    const filterValue = (value.name || value).toLowerCase();
    return this.members.filter(
      member => (member.name || member).toLowerCase().indexOf(filterValue) === 0
    );
  }

  onSubmit(fValue) {
    const teamId = this.service.tokenDetails.team_id;
    fValue[teamId] = teamId;
    this.projectService.createProject(teamId, fValue);

    this.userService.createUser(teamId,  {});
    _.each(this.selectedMembers, member => {
      this.userService.setUser(teamId, member.id, member);
    });
  }
}
