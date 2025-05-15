import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import allUsers from '../data/users.json';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users = [...allUsers];

    getUsers(): Observable<string[]> {
        return of([...this.users]);
    }
}