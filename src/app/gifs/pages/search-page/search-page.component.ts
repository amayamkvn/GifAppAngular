import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/GifsService.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent { 

  public gifService = inject(GifsService)
  gifs = signal<Gif[]>([]);

  onSearch( query: string ){
    this.gifService.searchGifs( query )
    .subscribe( (resp) => {
      //const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.gifs.set(resp);
      //console.log(gifs);
    });
    console.log({query});
  }

}
