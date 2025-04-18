import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/GifsService.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gifs-history',
  imports: [
    GifsListComponent
],
  templateUrl: './gifs-history.component.html',
})
export default class GifsHistoryComponent { 

  // query = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log(params['key']);
  // });
  gifService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['key'] ?? "No params")
    )
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  })

}
