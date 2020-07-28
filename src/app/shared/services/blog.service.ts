import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private arrBlogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First blog',
      date: '18:54:59, 26.07.2020',
      message: 'string sadasdasdsdsddddddddddddddddddd'
    }
  ];
  private arrUsers: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin777'
    }, {
      id: 2,
      username: 'vova',
      email: 'vova@gmail.com',
      password: 'vova777'
    }
  ];
  private nameUser: string;
  constructor() { }

  getBlogs(): Array<IBlog> {
    return this.arrBlogs
  }

  getUsers(): Array<IUser> {
    return this.arrUsers
  }

  addBlog(blog: IBlog): void {
    this.arrBlogs.push(blog)
  }

  addUser(user: IUser): void {
    this.arrUsers.push(user)
  }

  getName() {
    return this.nameUser;
  }

  addName(name: string) {
    return this.nameUser = name;
  }
}
