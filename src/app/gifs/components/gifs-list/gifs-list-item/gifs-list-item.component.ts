import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styleUrl: './gifs-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsListItemComponent {

  imageurl = input.required<string>();

}
