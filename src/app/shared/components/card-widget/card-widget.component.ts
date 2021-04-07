import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-widget',
  templateUrl: 'card-widget.component.html',
  styleUrls: ['card-widget.component.scss', 'card-widget.theme.scss']
})
export class CardWidgetComponent {

  @Input()
  title = '';

  @Input()
  description = '';

}
