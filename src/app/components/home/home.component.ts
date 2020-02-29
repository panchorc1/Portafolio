import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubService } from '../../services/github.service';
import { User } from '../../models/user.model';
import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
//Aqui el constructor esta recibiendo un parameto de tipo githubService, se encarga de traer el usuario
  constructor(private githubService: GithubService) { }
  findControl = new FormControl();
  error: boolean = false;
  user: User = null;
  ngOnInit(): void {
    this.findControl.valueChanges
    .pipe(filter(value => value.length > 3),
    debounceTime(1000),
    switchMap(value =>
      this.githubService.getUser(value).pipe(
        catchError( err => {
          this.user = null;
          this.error = true;
          return EMPTY;
          
        })))
        ).subscribe(user => this.user = user);
        }
  }

