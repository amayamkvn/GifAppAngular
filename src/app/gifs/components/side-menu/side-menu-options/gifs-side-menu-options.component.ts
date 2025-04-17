import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuOptions } from '../../../interfaces/menu-options.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './gifs-side-menu-options.component.html',
  styleUrl: './gifs-side-menu-options.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuOptionsComponent { 

  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Gifs Populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      sublabel: 'Buscar Gifs',
      route: '/dashboard/search',
    }, 
  ]

}
