import { Component, OnInit, TemplateRef } from '@angular/core';
import { BlogService } from '../../shared/services/blog.service';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { Blog } from 'src/app/shared/models/blog.model';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  modalRef: BsModalRef;
  blogsArray: Array<IBlog> = [];
  usersArray: Array<IUser> = [];
  name: string;
  postTitle: string;
  postText: string;
  private postI: number;
  change: boolean = false;

  constructor(private blogService: BlogService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getBlog();
    this.getUser();
    this.getN();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private getBlog(): void {
    this.blogsArray = this.blogService.getBlogs();
  }

  private getUser(): void {
    this.usersArray = this.blogService.getUsers();
  }

  private getN(): void {
    this.name = this.blogService.getName()
  }

  auditBtn(Aname: string) {
    this.getN();
    if (this.name !== this.usersArray[0].username) {
      if (Aname == this.name) {
        return this.usersArray.some(n => n.username === this.name)
      }
    } else {
      return true
    }
  }

  editPost(i: number, templ) {
    this.change = false;
    this.openModal(templ);
    this.postTitle = this.blogsArray[i].topic;
    this.postText = this.blogsArray[i].message;
    this.postI = i;
  }

  saveEditPost() {
    const d = new Date();
    const nowDate = d.toLocaleTimeString() + ', ' + d.toLocaleDateString();
    const editPost = new Blog(this.blogsArray[this.postI].id, this.blogsArray[this.postI].postedBy, this.postTitle, nowDate, this.postText)
    this.blogsArray.splice(this.postI, 1, editPost);
    this.modalRef.hide();
    this.postTitle = "";
    this.postText = "";
  }

  deletePost(templ, i: number) {
    this.change = true;
    this.postI = i;
    this.openModal(templ);
  }

  confirmDeletePost() {
    this.blogsArray.splice(this.postI, 1);
    this.modalRef.hide();
  }
}
