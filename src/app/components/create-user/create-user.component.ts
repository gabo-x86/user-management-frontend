import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm: FormGroup = this.fb.group({});
  @Input() userData: User | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: [''],
      passwordRepeated: [''],
      email: ['', [Validators.required, Validators.email]],
      createdAt: [''],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      age: ['', Validators.required],
      birthDay: ['', Validators.required]
    });
  }
  

  ngAfterViewInit(): void {
    if (this.userData) {
      this.userForm?.get('username')?.setValue(this.userData.username);
      this.userForm?.get('password')?.setValue(this.userData.password);
      this.userForm?.get('email')?.setValue(this.userData.email);
      this.userForm?.get('firstName')?.setValue(this.userData.firstName);
      this.userForm?.get('lastName')?.setValue(this.userData.lastName);
      this.userForm?.get('age')?.setValue(this.userData.age);
      this.userForm?.get('birthDay')?.setValue(this.userData.birthDay);
    }
  }
  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;    
    // Regex to have 3 caracteres as min, 1 mayus, 1 special char and 1 number.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/;
    if (!regex.test(password)) {
      return { 'invalidPassword': true };
    }  
    return null;
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('passwordRepeated');
  
      
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { 'passwordMismatch': true };
    }
    return null;
  }


  onSubmit() {
    if (this.userForm?.valid) {
      const user = this.userForm.value;
      const newUser = { ...user, birthDay: this.changeDateFormat(user.birthDay) };
      if (this.userData) {
        this.editUser(newUser);
      } else {
        this.createUser(newUser);
      }
    } else {
      console.log('Formulario inválido. Por favor, completa todos los campos requeridos.');
    }
  }

  changeDateFormat(dateStr: string): string | null {
    if (dateStr !== '') {
      const dateParts = dateStr.split('-');
      const day = dateParts[2];
      const month = dateParts[1];
      const year = dateParts[0];
      return `${month}-${day}-${year}`;
    } else return null;
  }

  createUser(newUser: User): void {
    this.userService.saveUser(newUser).subscribe(
      (response) => {
        location.reload();
        console.log('Usuario guardado con éxito:', response);
      },
      (error) => {
        console.error('Error al guardar usuario:', error);
      }
    );
  }


  editUser(editedUser: User): void {
    if (this.userData) {
      this.userService.editUser({ ...editedUser, id: this.userData.id }, this.userData.id).subscribe(
        (response) => {
          location.reload();
          console.log('Usuario guardado con éxito:', response);
        },
        (error) => {
          console.error('Error al guardar usuario:', error);
        }
      );
    }
  }
}

