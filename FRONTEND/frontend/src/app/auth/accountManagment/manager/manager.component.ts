import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit {
  public LoggedIn = false;
  public Error = false;
  public ExceptionMessage = '';

  username = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  constructor(private authservice: AuthServiceService,
    private userRouter: Router) { }

  option: string = this.userRouter.url;
  //initiliser
  ngOnInit(): void {
    //checks if user is logged in before permitting use
    if (this.LoggedIn) {
      this.userRouter.navigate(['/']);
      return;
    }
  }

  //-------------------------------------------------------------------------------------\\
  //register function
  onSignupClick(event: Event) {
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
    try {
      this.authservice.signupNewUser(this.username.value, this.password.value, this.firstName.value)
        .subscribe({
          next: (response) => {
            console.log('Response:', response);
            //attempt to fix error, user is still created
            if (Error instanceof HttpErrorResponse && Error.status === 201 || response instanceof HttpErrorResponse && response.status === 201 || response.toString().includes('Created')) {
              // if Signup was successful
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
            this.ExceptionMessage = "Error Occured: Creating Account, Check if Created"
            console.error('Signup Error, Check if Account Was Created:', err);
          },
        });
    } catch (error: any) {
      //httpResponse error catcher: doesn't work properly
      if (error instanceof HttpErrorResponse && error.status === 201) {
        this.ExceptionMessage = 'User Created Successfully';
        this.userRouter.navigate(['/signin']);
      }
    }
  }


  //---------------------------------------------------------------------------------\\
  //login function
  OnSigninClick(event: Event): void {
    event.preventDefault();
    this.Error = false;
    if (!this.username.value || !this.password.value) {
      this.Error = true;
      this.ExceptionMessage = 'Please Populate All Items/Fields'
      return;
    }
    console.log('Signin Data:', {
      username: this.username.value,
      password: this.password.value,
    });
    this.authservice.signinUser(this.username.value, this.password.value).subscribe({
      next: (response) => {
        const { token } = response as any;
        localStorage.setItem('x-auth-token', token);
        this.LoggedIn = true;
        this.userRouter.navigate(['/']);
      },
      error: (err) => {
        this.Error = true;
        console.error('Signin Error:', err);
        this.ExceptionMessage = "Error Occured Signing into Account"
      }
    })
  }
  //-------------------------------------------------------------------------------------\\
  get loggedInUser() {
    return !!localStorage.getItem('x-auth-token');
  }
}
//---------------------------------------End of File------------------------------------------\\
