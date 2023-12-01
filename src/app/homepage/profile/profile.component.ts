import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigLocal } from 'src/app/models/Config/localState';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  configLocal: ConfigLocal;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.configLocal = { userInfo: {} };
  }

  ngOnInit(): void {
    this.configLocal.userInfo = this.parseData().userInfo;

    this.formGroup = this.fb.group({
      checked: [false], // Initial state, you can set it to true if needed
    });
  }

  parseData() {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      const configLocal = JSON.parse(configLocalString);
      return configLocal;
    }
    return null;
  }
}
