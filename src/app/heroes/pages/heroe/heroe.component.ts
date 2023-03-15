import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';
import { switchMap, tap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {
  
  hero!: Hero;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap( ({id}) => this._heroesService.getHero(id) ),
        tap( console.log )
      )
      .subscribe( ( hero: Hero ) => {
          this.hero = hero;
      });

      
  }

  return() {
    this._router.navigate(['/heroes/listing']);
  }

}
