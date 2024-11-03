import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder,private authService:AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Easy access to form controls in the template
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.authService.register(this.registerForm.value).subscribe({

        next: () => {
          console.log("here what we sent to the backed : ",this.registerForm.value.email);
          console.log("Success");
          // Log registration data or send to the backend
          console.log('Registration successful!', this.registerForm.value);
        },
        error: (error) => {
          console.log("here what we sent to the backed : ",this.registerForm.value);
          console.error("Error during registration:", error);
        }
      });
    }
  }


}
