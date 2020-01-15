import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { HTTP } from "@ionic-native/http/ngx";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  form = {
    username: null,
    email: null,
    password: null
  };
  constructor(
    private user: UserService,
    private http: HTTP,
    private storage: Storage,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  register() {
    const username = this.form.username;
    const email = this.form.email;
    const password = this.form.password;
    if (username && email && password) {
      this.user
        .register(username, email, password)
        .then(data => {
          const newData = JSON.parse(data);
          const token = "Bearer " + newData.token;
          this.http.setHeader("*", "Authorization", token);
          this.storage.set("TOKEN_KEY", token).then(() => {
            this.authenticationService.authenticationState.next(true);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
