import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class TasksService {

  tasks: AngularFireList<any> = null; //  list of objects
  task: AngularFireObject<any> = null; //   single object

  private basePath = '/tasks';

  constructor(private db: AngularFireDatabase) {
    this.tasks = this.db.list(this.basePath);
  }

  // Return a single observable task
  getTask(key: string): AngularFireObject<any> {
    const taskPath =  `${this.basePath}/${key}`;
    this.task = this.db.object(taskPath);
    return this.task;
  }

  setTask(teamId: string, taskId: string, task): void {
    const taskPath =  `${this.basePath}/${teamId}`;
    const taskObj = this.db.list(taskPath);
    taskObj.set(taskId, task);
  }


  createTask(taskId, task): void  {
    this.tasks.set(taskId, task);
  }


  // Update an existing task
  updateTask(key: string, value: any): void {
    this.tasks.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single task
  deleteTask(key: string): void {
      this.tasks.remove(key)
        .catch(error => this.handleError(error));
  }

  // Deletes the entire list of tasks
  deleteAll(): void {
      this.tasks.remove()
        .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }

}
