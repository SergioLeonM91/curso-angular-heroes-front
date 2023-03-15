import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
    }
    `
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    if( !this._router.url.includes('edit')) {
      return;
    }

    this._activatedRoute.params
      .pipe(
        switchMap( ({id}) => this._heroesService.getHero(id) ),
        tap( console.log )
      )
      .subscribe( ( hero: Hero ) => {
          this.heroe = hero;
      });
  }

  save() {
    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if( this.heroe.uuid ) {

      this._heroesService.editHero( this.heroe )
      .subscribe( resp => {
        this.showSnackbar('Hero Updated!');
      });

    } else {

      this._heroesService.saveHero( this.heroe )
        .subscribe( heroe => {
          console.log(heroe);
          this._router.navigate(['/heroes/edit/', heroe.uuid]);
          this.showSnackbar('Hero Created!');
        });
        
    }
    
  }

  deleteHero() {

    const dialog = this.dialog.open( ConfirmComponent, {
      width: '550px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {

        if(result) {
          this._heroesService.deleteHero(this.heroe.uuid!)
            .subscribe( resp => {
                this._router.navigate(['/heroes/listing'])
            });
        }

      }
    )

  }

  showSnackbar(message: string): void {
    this._snackBar.open( message, 'Close', {
      duration: 2500
    });
  }
}
