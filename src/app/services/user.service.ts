import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8080/v1/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}?detailed=true`);
  }
  
  saveUser(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${userId}`);
  }

  editUser(user: User, userId: Number): Observable<any> {
    return this.http.put(`${this.API_URL}/${userId}`, user);
  }
}
