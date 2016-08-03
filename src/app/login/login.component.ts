import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, Control, ControlGroup, Validators } from '@angular/common'
import { LoginService } from '../login.service'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  
   username: Control;
   password: Control;
   userForm: ControlGroup;

   defaultName: string = "";
   defaultPassword: string = "No Password Required";
   defaultSuggested: string = "Enter Your Username";

   validUserName: string;
   suggestedUsername: string = this.defaultSuggested;
    
  constructor(private router:Router, private loginService:LoginService, fb:FormBuilder) {
      this.username = fb.control(this.defaultName, Validators.required);
      this.password = fb.control(this.defaultPassword); //Server has no password check yet, so no validation
      
      this.userForm = fb.group({
          username: this.username,
          password: this.password
      });
  }

  reset(usernameString: string) {
    this.username.updateValue(this.defaultName);
    this.password.updateValue(this.defaultPassword);
    this.suggestedUsername = usernameString;
  }

  login() {
    // on result, if good go to character list, on fail notify
    if (this.username.pristine) {
      this.reset("Please Enter A Username");
    }
    else {
      this.loginService.getUserName(this.username.value).then(username => this.validUserName = username)
        .then(username => {
            if (username != "Invalid") {
              //route to next area
              this.router.navigateByUrl('characterSelect');
            }
            else {
              this.reset("Invalid Username");
            }
        });
    }
  }

  ngOnInit() {
  }
}
