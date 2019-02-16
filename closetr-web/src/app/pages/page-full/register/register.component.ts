import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
  enableLogin: boolean;
  userExists: boolean;
  errorMessage: any;
  error: any;
  userService: UserService;
  authenticationService: AuthenticationService;
  show: boolean;

  constructor(private router: Router,
              private userservice: UserService,
              private authenticationservice: AuthenticationService) {
    this.name = "";
    this.username = "";
    this.password = "";
    this.passwordConfirm = "";
    this.userExists = false;
    this.userService = userservice;
    this.authenticationService = authenticationservice;
    this.show = false;

    this.errorMessage = {
      'name':'',
      'username':'',
      'password':'',
      'passwordConfirm':''
    };

    this.error = {
      'name': false,
      'username': false,
      'password': false,
      'passwordConfirm': false
    };

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    } else {
      this.show = true;
    }
  }

  checkEnableRegister(): boolean {
    if (this.name.length == 0
        || this.username.length == 0
        || this.password.length == 0
        || this.passwordConfirm.length == 0
        || (this.password != this.passwordConfirm)) {
      return false;
    }
    return true;
  }

  registerChangeHandler(): void {
    this.userExists = false;
    this.checkError();
  }

  checkError(): void {
    this.errorMessage = {
      'name':'',
      'username':'',
      'password':'',
      'passwordConfirm':''
    };

    this.error = {
      'name': false,
      'username': false,
      'password': false,
      'passwordConfirm': false
    };

    if (this.password.length != 0
        && this.passwordConfirm.length != 0
        && this.password != this.passwordConfirm) {
          this.errorMessage.passwordConfirm = 'passwords are not the same.';
          this.error.passwordConfirm = true;
        }

    if (this.password.length == 0
        && this.passwordConfirm.length != 0) {
          this.errorMessage.password = 'password is required.'
          this.error.password = true;
        }

    if ((this.password.length != 0
        || this.passwordConfirm.length != 0)
        && this.username.length == 0) {
          this.errorMessage.username = 'username is required.'
          this.error.username = true;
        }
    if (this.userExists) {
      this.errorMessage.username = 'user with that username already exists.';
      this.error.username = true;
    }

    if ((this.username.length != 0
         || this.password.length != 0
         || this.passwordConfirm.length != 0)
        && (this.name.length == 0)) {
          this.errorMessage.name = 'name is required.';
          this.error.name = true;
        }
  }

  toSignIn(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    this.userExists = false;
    var params = {
      userName: this.name,
      userID: this.username,
      userPassword: this.password
    }
    this.userService.register(new User(params)).subscribe(
      (data: any) => {
        console.log(data);
        var isRegistered = data.auth;
        if (isRegistered) {
          this.router.navigate(['/dashboard']);
        } else {
          this.userExists = true;
        }
      }, error => {}
    );
  }

  ngOnInit() {
  }

}