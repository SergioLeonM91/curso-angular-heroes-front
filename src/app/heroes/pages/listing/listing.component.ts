import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styles: [
    
  ]
})
export class ListingComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private _heroesService: HeroesService
  ) {}

    ngOnInit(): void {
      
      this._heroesService.getHeroes()
        .subscribe( resp => this.heroes = resp )

        
    }

}
