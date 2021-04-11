import {Component, OnInit} from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-bootcamp';
  isDarkMode$: Observable<boolean>;

  constructor(private themeService: ThemeService, private httpClient: HttpClient) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  ngOnInit(): void {
  }


  logScroll($event: Event): void {
    console.log($event);

  }
}
