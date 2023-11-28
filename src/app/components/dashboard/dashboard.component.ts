import { Component } from '@angular/core';
import { User } from '../../shared/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  users: User[] | null = null; ;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        //console.log(this.users);
      },
      (error) => {
        console.error('Error trying to get users:', error);
      }
    );
  }
}
