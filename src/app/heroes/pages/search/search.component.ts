import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  term: string = '';
  heroes: Hero[] = [];
  selectedHero!: Hero;

  constructor(
    private _heroesService: HeroesService
  ) {}

  searching() {
    this._heroesService.getSuggestions(this.term.trim())
      .subscribe( heroes => this.heroes = heroes );
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if(event.option.value) {
      const hero: Hero = event.option.value;
      this.term = hero.superhero.toLocaleLowerCase();
      this._heroesService.getHero(hero.uuid!)
        .subscribe( hero => this.selectedHero = hero );
    }
  }
}
