import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenuComponent } from '../../components/side-menu/gifs-side-menu.component';

@Component({
  selector: 'app-dashdoard-page',
  imports: [
    RouterOutlet,
    GifsSideMenuComponent,
],
  templateUrl: './dashdoard-page.component.html',
  styleUrl: './dashdoard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashdoardPageComponent { }
