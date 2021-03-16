import {Component} from '@angular/core';
import {ThemeService} from '../../../shared/services/theme.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss', 'header.theme.scss']
})
export class HeaderComponent {

  isDarkTheme$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkMode$;
  }

  switchTheme(isDark: MatSlideToggleChange): void {
    console.log(isDark);
    this.themeService.setTheme(isDark.checked);
  }
}
