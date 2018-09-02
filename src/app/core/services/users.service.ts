import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class UsersService {

  users: AngularFireList<any> = null; //  list of objects
  user: AngularFireObject<any> = null; //   single object

  private basePath = '/users';

  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list(this.basePath);
  }

  // Return a single observable user
  getUser(key: string): AngularFireObject<any> {
    const userPath =  `${this.basePath}/${key}`;
    this.user = this.db.object(userPath);
    return this.user;
  }

  setUser(teamId: string, userId: string, user): void {
    const userPath =  `${this.basePath}/${teamId}`;
    const userObj = this.db.list(userPath);
    userObj.set(userId, user);
  }


  createUser(userId, user): void  {
    this.users.set(userId, user);
  }


  // Update an existing user
  updateUser(key: string, value: any): void {
    this.users.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single user
  deleteUser(key: string): void {
      this.users.remove(key)
        .catch(error => this.handleError(error));
  }

  // Deletes the entire list of users
  deleteAll(): void {
      this.users.remove()
        .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
