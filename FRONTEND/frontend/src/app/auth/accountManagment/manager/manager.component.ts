import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';



@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit {
  isLoggedIn = false;
  Error = false;
  ExceptionMessage = '';

  username = new FormControl('');
  firstName = new FormControl('');
  password = new FormControl('');
  constructor(private authservice: AuthServiceService, private userRouter: Router) { }
  option: string = this.userRouter.url;

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.userRouter.navigate(['/']);
      return;
    }
  }
  
  //-------------------------------------------------------------------------------------\\
  //register function
  onSignup(event: Event) {
    this.Error = false;
    event.preventDefault();
    if (!this.username.value || !this.firstName.value || !this.password.value) {
      this.Error = true;
      this.ExceptionMessage = 'Please Populate All Items'
      return;
    }
    console.log('Signup Data:', {
      username: this.username.value,
      password: this.password.value,
      firstname: this.firstName.value
    });
    this.authservice.signup(this.username.value, this.password.value, this.firstName.value)
      .subscribe({
        next: (response) => {
          if (response === 'Created' || response.valueOf() === 'Created') {
            // Signup was successful
            this.ExceptionMessage = 'User Created Successfully';
            this.userRouter.navigate(['/signin']);
          } else {
            // Handle unexpected response
            this.Error = true;
            this.ExceptionMessage = 'Unexpected response: ' + JSON.stringify(response);
            console.log(response);
          }
        }, error: (err) => {
          this.Error = true;
          this.ExceptionMessage = "Invalid: Error Creating Account"
          console.error('Signup Error:', err);
        },
      });
  }


  //---------------------------------------------------------------------------------\\
//login function
  OnSignin(event: Event): void {
    event.preventDefault();
    this.Error = false;
    if (!this.username.value || !this.password.value) {
      this.Error = true;
      this.ExceptionMessage = 'Please Populate All Items'
      return;
    }
    console.log('Signin Data:', {
      username: this.username.value,
      password: this.password.value,
    });
    this.authservice.signin(this.username.value, this.password.value).subscribe({
      next: (response) => {
        const { token } = response as any;
        localStorage.setItem('x-auth-token', token);
        this.isLoggedIn = true;
        this.userRouter.navigate(['/']);
      },
      error: (err) => {
        this.Error = true;
        console.error('Signin Error:', err);
        this.ExceptionMessage = "Error Signing into Account"
      }
    })
  }
//-------------------------------------------------------------------------------------\\
get loggedInUser() {
  return !!localStorage.getItem('x-auth-token');
}
}
//---------------------------------------End of File------------------------------------------\\
