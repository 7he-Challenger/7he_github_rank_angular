import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../services/http.services';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpServices) { }

  ngOnInit(): void {
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
          },
          error: (error: any) => {
            console.log(error)
          }
        })
      )
      .subscribe();
  }
}
