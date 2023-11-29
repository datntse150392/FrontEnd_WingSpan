import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APIService } from 'src/app/service/APIservice.service';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { User } from 'src/app/models/UserModel';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/ToastService.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    username: new FormControl(''), // <== default value
    password: new FormControl(''), // <== default value
  });
  user: User = {};
  configLocal: ConfigLocal = {
    userInfo: {},
  };

  constructor(
    private APIservice: APIService,
    private router: Router,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {}

  login() {
    this.APIservice.login(
      this.signInForm.value.username,
      this.signInForm.value.password
    ).subscribe((res: any) => {
      try {
        if (res.data.user) {
          this.user = res.data.user;
          this.configLocal.userInfo = this.user;
          localStorage.setItem('configLocal', JSON.stringify(this.configLocal));
          // Display success toast message after successful login
          this.toastService.setToastIsLogin(true);
          this.router.navigate(['/']);
        } else {
        }
      } catch (error) {
        this.toastService.setToastIsLogin(false);
        localStorage.clear();
      }
    });
  }
}
