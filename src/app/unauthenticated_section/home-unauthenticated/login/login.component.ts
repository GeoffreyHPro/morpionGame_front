import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: this.formBuilder.control(""),
      password: this.formBuilder.control("")
    })
  }

  handleButtonLogin() {
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;

    this.authService.login(email, password).subscribe(
      response => {
        console.log(response.body?.token)

        localStorage.setItem("token", response.body!.token);
        console.log(response.body!.token)
        localStorage.setItem("role", response.body!.role);
        this.router.navigateByUrl("home")
      }
    )
  }
}