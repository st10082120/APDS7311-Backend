import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { BoardPost } from '../models/board-post.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
//----------------------------------------------------------------------------------------------------\\
export class BoardServiceService {
  private postsdisplay: { _id: string, id: string, __V: string, name: string, description: string }[] = [];
  private UpdatePostsDisplay = new Subject<{ _id: string, id: string, __V: string, name: string, description: string }[]>();
  //BASE_URL imported from the environment variable
  private readonly BASE_URL = `${environment.BaseUrl}/api/posts`;
  boardPosts: BoardPost[] = [];

  constructor(private http: HttpClient, private authService: AuthServiceService) { }
  //----------------------------------------------------------------------------------------------------\\
  addpost_service(pid: string, pname: string) {
    this.http.post<{ message: string, post: any }>(this.BASE_URL, { id: pid, name: pname })
      .subscribe((thePost) => {
        this.postsdisplay.push(thePost.post);
        this.UpdatePostsDisplay.next([...this.postsdisplay])
      })
  }
  //----------------------------------------------------------------------------------------------------\\
  //gets all the posts
  getAllPosts() {
    const token = this.authService.token;
    return this.http.get<BoardPost>(this.BASE_URL, {
      headers: {
        'x-auth-token': token ?? '',
      },
    });
  }
  add(title: string, description: string, departmentCode: string) {
    const token = this.authService.token;
    return this.http.post(this.BASE_URL, {
      title,
      description,
      departmentCode: departmentCode,
    }, {
      headers: {
        'x-auth-token': token ?? '',
      },
    });
  }
  //-------------------------------------------------------------------------------------------------------------\\
  getboard_service() {
    this.http.get<{ message: string, post: any }>(this.BASE_URL).subscribe((thePost) => {
      this.postsdisplay = thePost.post;
      this.UpdatePostsDisplay.next([...this.postsdisplay])
    })
  }
  //-------------------------------------------------------------------------------------------------------------\\
  //delete service, called when deleteing a post
  deletepost_service(postid: string) {
    return this.http.delete<BoardPost>(`${this.BASE_URL}/${postid}`, {
      headers: {
        'x-auth-token': this.authService.token ?? '',
      },
    });
  }
  //-------------------------------------------------------------------------------------------------------------\\
  getUpdateListener() {
    return this.UpdatePostsDisplay.asObservable();
  }

  //-------------------------------------------------------------------------------------------------------------\\
}
//-------------------------------------------End of File---------------------------------------------------------\\