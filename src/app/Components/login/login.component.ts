import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  formGroup: FormGroup = new FormGroup({});

  constructor(private router: Router, private authservice: LoginService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.authservice.auth_login(this.formGroup.value).subscribe({
        next: (data) => {
          localStorage.setItem('login', data.token);
          this.router.navigate(['/home']);
          Swal.fire(
            'Login orrect',
            'You clicked the button!',
            'success'
          );
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
          });
        },
      }
      )
    }

  }


}
