import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngxs/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from '@auth/store';

// Минимальная и максиимальная длина пароля
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 50;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {

    // Инициализация реактивной формы
    this.loginFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)]]
    });
  }

  ngOnInit() {
  }

  loginAction() {
    if (this.loginFormGroup.valid) {
      this.store.dispatch(new Login(this.loginFormGroup.value));
    }
  }

}
