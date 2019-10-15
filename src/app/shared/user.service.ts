import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };

  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};

  constructor(private httpClient: HttpClient) {
  }

  postUser(user: User) {
    const url = `${this.apiUrl}/auth/signup`;
    return this.httpClient.post(url, user, this.noAuthHeader);
  }

  login(authCredential) {
    const url = `${this.apiUrl}/auth/login`;
    return this.httpClient.post(url, authCredential, this.noAuthHeader);
  }

  getUserProfile() {
    const url = `${this.apiUrl}/user/me`;
    return this.httpClient.get(url);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = window.btoa(token.split('.')[1]);
      return JSON.parse(JSON.stringify(userPayload));
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
