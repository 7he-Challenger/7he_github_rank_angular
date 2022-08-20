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
  userCount: Number = 0;
  error: Boolean = false;
  defaultLocation: string = 'madagascar';
  displayedColumns: string[] = ['login', 'avatar_url'];

  constructor(private http: HttpServices) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(location: string = this.defaultLocation) {
    console.log(environment.GITHUB_API_BASE_URL);
    return this.http.get(environment.GITHUB_API_BASE_URL + 'search/users?q=location:' + location)
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
