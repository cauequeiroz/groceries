import { Component } from "@angular/core";
import { User } from '../../shared/user/user';
import { UserService } from '../../shared/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: "my-app",
  providers: [ UserService ],
  templateUrl: 'pages/login/login.html',
  styleUrls: ['pages/login/login-common.css', 'pages/login/login.css']
})
export class LoginComponent {

    private user: User;
    private userService: UserService;    
    private isLoggingIn = true;
    private router: Router;

    constructor(userService: UserService, router: Router) {

        this.user = new User();
        this.user.email = 'cauequeiroz@dev.com.br';
        this.user.password = 'caue1234';
        
        this.userService = userService;
        this.router = router;
    }

    submit() {

        if ( this.isLoggingIn ) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        
        this.userService
            .login(this.user)
            .subscribe(
                () => this.router.navigate(['/list']),
                (error) => alert('Unfortunately we could not find your account.')
            );
    }

    signUp() {

        this.userService
            .register(this.user)
            .subscribe(
                () => {
                    alert('Your account was successfully created!.');
                    this.toggleDisplay();
                },
                () => alert('Unfortunately we were unable to create your account.')
            );
    }

    toggleDisplay() {

        this.isLoggingIn = !this.isLoggingIn;
    }
}