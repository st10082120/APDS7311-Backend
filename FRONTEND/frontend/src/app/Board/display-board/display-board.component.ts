import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardServiceService } from '../board-service.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.css']
})
//----------------------------------------------------------------------------------------------------\\
export class DisplayBoardComponent implements OnInit {

  error = false;
  exceptionMessage = '';

  boardPosts: any[] = [];
  postTitle = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  departmentCode = new FormControl('', [Validators.required]);

  constructor(private userRouter: Router, private authService: AuthServiceService, private boardService: BoardServiceService) { }
  //initiliser
  ngOnInit(): void {
    if (!this.authService.loggedInUser) {
      this.userRouter.navigate(['/signin'])
      return;
    }
    this.boardService.getAllPosts().subscribe({
      next: (response) => (this.boardPosts = response as any),
      error: (error) => console.log(error),
    });
  }
  //----------------------------------------------------------------------------------------------------\\
  //deletes a post
  deletePost(postId: string) {
    this.boardService.deletepost_service(postId).subscribe(
      () => {

        this.boardPosts = this.boardPosts.filter(post => post._id !== postId);
      },
      error => {
        console.error('Error Deleting Post:', error);
      }
    );
  }
  //----------------------------------------------------------------------------------------------------\\
  //logs the user out using authservice class
  logoutUser(): void {
    // Call the logout function from service
    this.authService.logoutUser();
    this.userRouter.navigate(['/signin']); // navigates to sign-in page
  }
  //----------------------------------------------------------------------------------------------------\\
  //creates a new post on mongoDB
  createNewPost(event: Event) {
    event.preventDefault();
    this.error = false;

    if (!this.postTitle.value || !this.description.value || !this.departmentCode.value) {
      this.error = true;
      this.exceptionMessage = "Please Populate all Fields";
      return;
    }

    this.boardService.add(this.postTitle.value, this.description.value, this.departmentCode.value).subscribe({
      next: (response) => {
        this.boardPosts.push(response);
        this.postTitle.setValue('');
        this.description.setValue('');
      },
      error: (err) => {
        this.error = true;
        this.exceptionMessage = err.error;
        console.log(err);
      },
    });
  }
  //----------------------------------------------------------------------------------------------------\\

}

//--------------------------------------------End of File--------------------------------------------------------\\