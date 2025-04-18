import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private readonly storageKey = 'gifSearchHistory'; // Define una clave para localStorage

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  searchGifsList = signal<Gif[]>([]);

  searchHistory = signal<Record<string, Gif[]>>(this.loadHistoryFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs();
   }

  //Guardar en el local storage
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(this.storageKey, historyString);
  });

  // Método para cargar desde localStorage
  private loadHistoryFromLocalStorage(): Record<string, Gif[]> {
    const storedHistory = localStorage.getItem(this.storageKey);
    if (storedHistory) {
        // Parsea el JSON guardado
        return JSON.parse(storedHistory);
    }
    // Si no hay nada guardado, retorna un objeto vacío
    return {};
  }    

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.ApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.ApiKey,
        limit: 20
      }
    })
    .subscribe(( resp ) => {
      // console.log({ resp });
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      // console.log({ gifs });
      // console.log({ trendingGifs: this.trendingGifs() });
    });
  }

  searchGifs( query: string ){
    return this.http.get<GiphyResponse>(`${environment.ApiUrl}/gifs/search`, {
      params: {
        api_key: environment.ApiKey,
        q: query,
        limit: 20
      }
    }).pipe( 
      map( (item) => GifMapper.mapGiphyItemsToGifArray(item.data) ),

      //Tap para efectos secundarios que en este caso sería almacenar las keys
      tap( items => {
        this.searchHistory.update( history => ({
          ...history,
          [query.toLowerCase()]: items,
        }) )
      }),
      tap(item => console.log(this.searchHistory())),
      tap(item => console.log(this.searchHistoryKeys())),
      
      
    );
    // .subscribe( (resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   this.searchGifsList.set(gifs);
    //   //console.log(gifs);
    // })
  }

  getHistoryGifs( query: string ): Gif[]{
    return this.searchHistory()[query] ?? [];
  }

}
