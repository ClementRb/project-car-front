import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form = {
    username: null,
    password: null
  };
  constructor(
    private user: UserService,
    private storage: Storage,
    private http: HTTP,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  login() {
    const username = this.form.username;
    const password = this.form.password;
    if (username && password) {
      this.user
        .login(username, password)
        .then(data => {
          console.log(data);
          const user: any = data;
          const newData = JSON.parse(user);
          const token = 'Bearer ' + newData.token;
          this.http.setHeader('*', 'Authorization', token);
          this.user.getUserInfos(username).then(userInfo => {
            this.storage.set('USER_INFO', userInfo).then(() => {
              this.storage.set('TOKEN_KEY', token).then(() => {
                this.authenticationService.authenticationState.next(true);
                this.router.navigate(['']);
              });
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
