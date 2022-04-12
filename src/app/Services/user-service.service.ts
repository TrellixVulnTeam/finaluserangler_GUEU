import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../Models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private httpoption = {};
  constructor(private httpClient: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  addUser(newuser: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.ApiBaseURL}/register`,
      JSON.stringify(newuser),
      this.httpoption
    );
  }
}
