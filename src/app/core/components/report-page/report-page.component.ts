import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import * as moment from 'moment';
import * as _ from 'lodash';
import { TasksService } from '../../services/tasks.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private usersService: UsersService,
    private tasksService: TasksService
  ) {}
  teamId: string;
  usersList: any[];
  questions: any;
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => (this.teamId = params['id'])
    );
    this.projectService.getProject(this.teamId).valueChanges().subscribe(project => {
      this.questions = _.values(project.questions);
      console.log(this.questions);
    });
    this.usersService
      .getUser(this.teamId)
      .valueChanges()
      .subscribe(users => {
        this.usersList = _.values(users);
        console.log(this.usersList);
        _.each(this.usersList, user => {
          console.log(`_${moment(new Date()).format('DD-MM-YYYY')}_${user.id}`);
          this.tasksService
            .getTask(`${this.teamId}/_02-09-2018_${user.id}`)
            .valueChanges()
            .subscribe(task => {
              user.tasks = _.values(task);
            });
        });
        console.log(this.usersList);
      });
  }
}
