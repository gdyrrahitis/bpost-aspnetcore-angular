import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private form: FormGroup;
  private returnUrl: string;
  constructor(private authService: AuthService, private router: Router, 
    private activated: ActivatedRoute) { }

  ngOnInit() {
    this.activated.queryParams.subscribe(params => {
        this.returnUrl = params["returnUrl"];
    });

    this.form = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  ngSubmit() {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    this.authService.authenticate(username, password).subscribe(() => {
      const url = this.returnUrl || '/';
      this.router.navigate([url]);
    }, (error) => {
      this.form.setErrors({
        notAuthorized: true
      });
    });
  }
}
