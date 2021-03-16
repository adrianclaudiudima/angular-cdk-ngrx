import {Injectable} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class ThemeService {
  private readonly themeKey = 'isDark';
  private isDarkMode = false;
  private isDarkModeSubject: Subject<boolean> = new ReplaySubject<boolean>(1);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

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
