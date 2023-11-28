import { Component, Input } from '@angular/core';
import { User } from '../../shared/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() userData: User | null = null;
  
  ngOnInit(): void {
  }

  constructor(private userService: UserService) {
  }

  deleteUser(userId: number):void{
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log('User deleted!', response);
        location.reload();
      },
      (error) => {
        console.error('Error at the deleting moment:', error);
      }
    );

  }
}
