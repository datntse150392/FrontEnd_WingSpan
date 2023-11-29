import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { User } from 'src/app/models/UserModel';
import { APIService } from 'src/app/service/APIservice.service';
import { ToastService } from 'src/app/service/ToastService.service';
const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.email,
      ])
    ), // <== default value
    username: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ), // <== default value
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ), // <== default value
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

  register() {
    this.APIservice.register(
      this.signUpForm.value.email,
      this.signUpForm.value.username,
      this.signUpForm.value.password
    ).subscribe((res: any) => {
      try {
        if (res.data.user) {
          this.user = res.data.user;
          this.configLocal.userInfo = this.user;
          localStorage.setItem('configLocal', JSON.stringify(this.configLocal));
          // Display success toast message after successful login
          this.toastService.setToastIsRegister(true);
          this.router.navigate(['/']);
        } else {
          this.toastService.setToastIsRegister(false);
        }
      } catch (error) {
        this.toastService.setToastIsRegister(false);
        localStorage.clear();
      }
    });
  }
}
