import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'https://localhost:44357/connect/token';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  authenticate(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', "password");
    body.set('client_id', "angular.client");
    body.set('client_secret', "secret");

    return this.http.post<any>(this.url, body.toString(), {
      headers: headers
    }).pipe(
      map(jwt => {
        if (jwt && jwt.access_token) {
          localStorage.setItem('token', JSON.stringify(jwt))
        }
      })
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return this.jwtHelper.tokenGetter();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
