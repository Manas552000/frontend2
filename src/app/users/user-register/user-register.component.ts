import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        userName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required]),
        mobile: new FormControl(null, [Validators.required, Validators.minLength(10) ,Validators.maxLength(10)])
      }
    )
  }

  public userName: string = ""
  public userEmail: string = "";
  public userPassword: string = "";
  public userMobile: string = ""


  onSubmit() {
    console.log(this.registrationForm)
    const data =
    {
      "name": this.userName,
      "email": this.userEmail,
      "password":crypto.SHA256(this.userPassword).toString(),
      "Mobile": this.userMobile
    }
    if (this.userName != '', this.userEmail != '', this.userPassword != '') {
      this.http.post('http://localhost:5000/api/User', data).subscribe(data => {
        console.log(data);
        if (data != null) {
          alert("Registered Sucessfully..!!");
          this.router.navigate(["/users/user-login"]);
        }
        else {
          alert("User Already Exists..");
        }
      })
    }
    else {
      alert("Please provide name,email,password to Register");
    }
  }

}
