import { Component, OnInit, Input, Output } from '@angular/core';
import { Pessoa, Post } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;
  cientist: Pessoa;
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      conteudo: '',
      email: ''
    });
    this.post = {
      id: null,
      conteudo: '',
      email: ''
    }
  }

  onSubmit() {
    this.post.conteudo = this.registerForm.get('conteudo').value;
    this.post.email = this.cientist.email;
    this.service.addPost(this.post).subscribe(data => { 
      this.ngOnInit();
     });    
  }

  ngOnInit() {
    this.searchProfile();
    this.searchPosts();
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("email")).subscribe(data => {
      this.posts = data;
    });
  }

  searchProfile() {
    this.service.getCientist(localStorage.getItem("email"))
      .subscribe(data => {
        this.cientist = data;
        localStorage.setItem("profile_email", data.email);
      });
  }


  gotoUpdate(cientist: Pessoa) {
    localStorage.setItem("id", cientist.id.toString());
    this.router.navigate(['update']);
  }

  logout() {
    this.authService.logout();
  }
}