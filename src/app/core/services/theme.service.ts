import {Injectable} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ThemeService {
  private readonly themeKey = 'isDark';
  private isDarkMode = false;
  private isDarkModeSubject: Subject<boolean> = new ReplaySubject<boolean>(1);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();
  public chartThemeConfig: Observable<ChartThemeConfig> = this.isDarkMode$.pipe(
    map(isDarkMode => {
      return {
        backgroundColor: isDarkMode ? '#EFEFEF' : '#1d1d1d',
        borderColor: isDarkMode ? '#ef5350' : '#ef5350',
        hoverBackgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
        isDark: isDarkMode
      };
    })
  );

  constructor(private overlayContainer: OverlayContainer) {
    const item = localStorage.getItem(this.themeKey);
    this.isDarkMode = !!(item && Boolean(JSON.parse(item)));
    this.setTheme(this.isDarkMode);
  }


  public setTheme(isDark: boolean): void {
    if (isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      this.overlayContainer.getContainerElement().classList.remove('light-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('light-theme');
    }
    this.isDarkMode = isDark;
    localStorage.setItem(this.themeKey, String(isDark));
    this.isDarkModeSubject.next(this.isDarkMode);
  }
}

export interface ChartThemeConfig {
  backgroundColor: string;
  hoverBackgroundColor: string;
  borderColor: string;
  isDark: boolean;
}
