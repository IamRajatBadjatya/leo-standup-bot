import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class ProjectsService {

  projects: AngularFireList<any> = null; //  list of objects
  project: AngularFireObject<any> = null; //   single object

  private basePath = '/projects';

  constructor(private db: AngularFireDatabase) { 
    this.projects = this.db.list(this.basePath);
  }

  // Return a single observable project
  getProject(key: string): AngularFireObject<any> {
    const projectPath =  `${this.basePath}/${key}`;
    this.project = this.db.object(projectPath);
    return this.project;
  }

  createProject(projectId, project): void  {
    this.projects.set(projectId, project);
  }

  // Update an existing project
  updateProject(key: string, value: any): void {
    this.projects.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single project
  deleteProject(key: string): void {
      this.projects.remove(key)
        .catch(error => this.handleError(error));
  }

  // Deletes the entire list of projects
  deleteAll(): void {
      this.projects.remove()
        .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
