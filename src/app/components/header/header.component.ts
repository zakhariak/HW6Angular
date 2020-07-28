import { Component, OnInit, TemplateRef } from '@angular/core';
import { BlogService } from '../../shared/services/blog.service';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { Blog } from 'src/app/shared/models/blog.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  blogsArray: Array<IBlog> = [];
  usersArray: Array<IUser> = [];
  modalRef: BsModalRef;
  mTitle: string;
  mSignUp: boolean = false;
  mAddPost: boolean = false;
  hidden: boolean = false;
  userName: string;
  email: string;
  password: string;
  postTitle: string;
  postText: string;
  nameBtn: string;
  alertM: boolean;
  alertMessage: string;

  constructor(private blogService: BlogService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getBlog();
    this.getUser();
  }

  private getBlog(): void {
    this.blogsArray = this.blogService.getBlogs();
  }

  private getUser(): void {
    this.usersArray = this.blogService.getUsers();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  btnSignIn(templ) {
    this.formReset()
    this.mTitle = 'Sign In';
    this.openModal(templ)
    this.mAddPost = false;
    this.mSignUp = false;
  }

  btnSignUp(templ) {
    this.formReset()
    this.mTitle = 'Sign Up';
    this.openModal(templ)
    this.mAddPost = false;
    this.mSignUp = true;
    this.alarms()
  }

  btnAddPost(templ) {
    this.formReset()
    this.mTitle = 'Add post';
    this.openModal(templ)
    this.mAddPost = true;
    this.alarms()
  }

  exitUser() {
    this.hidden = false;
    this.nameBtn = "";
    this.blogService.addName('');
    this.alarms()
  }

  signIn() {
    if (this.email && this.password) {
      if (this.email == this.usersArray[0].email && this.password == this.usersArray[0].password) {
        this.nameBtn = this.usersArray[0].username;
      } else if (this.usersArray.find(name => name.email == this.email) !== undefined && this.usersArray.find(name => name.password == this.password) !== undefined) {
        this.nameBtn = this.usersArray.find(name => name.email == this.email).username;
      } else {
        this.alarms('Не правильно введені дані, або такого кориcтувача немає!');
      }
      this.userName = "";
      this.email = "";
      this.password = "";
      if (this.nameBtn) {
        this.modalRef.hide();
        this.hidden = true;
        this.blogService.addName(this.nameBtn)
      }
    } else {
      this.alarms('Не всі поля заповнені!');
    }
  }


  signUp() {
    if (this.email && this.password && this.userName) {
      if (!this.usersArray.some(us => us.username == this.userName) && !this.usersArray.some(us => us.email == this.email)) {
        const newUser = new User(1, this.userName, this.email, this.password);
        if (this.usersArray.length > 0) {
          newUser.id = this.usersArray.slice(-1)[0].id + 1;
        }
        this.blogService.addUser(newUser);
        this.signIn()
      } else {
        this.alarms('Такий користувач вже існує!')
      }
    } else {
      this.alarms('Не всі поля заповнені!')
    }
  }

  addPost() {
    const d = new Date();
    const nowDate = d.toLocaleTimeString() + ', ' + d.toLocaleDateString();
    if (this.postTitle.length !== 0 && this.postText.length !== 0) {
      const newPost = new Blog(1, this.nameBtn, this.postTitle, nowDate, this.postText);
      if (this.blogsArray.length > 0) {
        newPost.id = this.blogsArray.slice(-1)[0].id + 1;
      }
      this.blogService.addBlog(newPost);
      this.formReset()
      this.modalRef.hide()
    } else {
      this.alarms('Заповніть усі поля!')
    }
  }

  alarms(mes?: string) {
    if (mes) {
      this.alertM = true;
      this.alertMessage = mes;
    } else {
      this.alertM = false;
      this.alertMessage = '';
    }
  }
  formReset() {
    console.log('work');

    this.userName = "";
    this.email = "";
    this.password = "";
    this.postTitle = "";
    this.postText = "";
  }
}
