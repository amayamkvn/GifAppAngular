import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@envs/environment';

@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
  styleUrl: './gifs-side-menu-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeaderComponent {

  envs = environment;

 }
