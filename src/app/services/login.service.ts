import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  private httpOptions = {};
  constructor(private httpClient: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
    });
    return next.handle(token);
  }

  auth_login(data: Login): Observable<any> {
    return this.httpClient.post(`${environment.ApiBaseURL}/login`, data);
  }


  loggedin() {
    return !!localStorage.getItem('login');
  }
  logoutuser() {
    localStorage.removeItem('login');
    this.router.navigate(['/home']);
  }
}
