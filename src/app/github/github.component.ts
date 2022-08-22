import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../services/http.services';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import {countries} from 'src/constants/countries';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})

export class GithubComponent implements OnInit {
  data: any = [];
  userCount: number = 0;
  error: Boolean = false;
  defaultLocation: string = 'madagascar';
  displayedColumns: string[] = ['login', 'avatar_url'];
  per_page = 10;
  page = 1;
  total_page = 1;
  countryList:any = [];
  constructor(private http: HttpServices) { }

  ngOnInit(): void {
    this.countryList = countries;
    this.getUsers();
  }

  public getUsers(location: string = this.defaultLocation, per_page: number = this.per_page, page: number = this.page) {
    console.log(environment.GITHUB_API_BASE_URL);
    return this.http.get(environment.GITHUB_API_BASE_URL + 'search/users?q=location:' + location + '&per_page=' + per_page + '&page=' + page)
      .pipe(
        tap({
          next: (data: any) => {
            this.data = data.items;
            this.userCount = data.total_count;
            this.error = false;
            this.total_page = Math.ceil(this.userCount / per_page);
          },
          error: (error: any) => {
            console.log(error)
          }
        })
      )
      .subscribe();
  }


  public getUserInPage(event : PageEvent) {
    this.getUsers(this.defaultLocation, event.pageSize, event.pageIndex + 1);
  }

  public onChangeCountry(event: string) {
    this.getUsers(event.toLowerCase());
  }
}
