import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from './user';
import { Config } from '../config';

@Injectable()
export class UserService {

    http: Http;

    constructor(http: Http) {
        
        this.http = http;
    }

    login(user: User) {

        let headers = new Headers();
            headers.append('Content-type', 'application/json');

        let loginCompleteInfo = {
            username: user.email,
            password: user.password,
            grant_type: 'password'
        };
        
        return this.http.post(
            Config.apiUrl + 'oauth/token',
            JSON.stringify(loginCompleteInfo),
            { headers: headers }
        )
        .map(res => res.json())
        .do(data => {
            Config.token = data.Result.access_token;
        })
        .catch(this.handleErrors);
    }

    register(user: User) {

        let headers = new Headers();
            headers.append('Content-type', 'application/json');

        let userCompleteInfo = {
            Username: user.email,
            Email: user.email,
            Password: user.password
        };
        
        return this.http.post(
            Config.apiUrl + 'Users',
            JSON.stringify(userCompleteInfo),
            { headers: headers }
        )
        .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}