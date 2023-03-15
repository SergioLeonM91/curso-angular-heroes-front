import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _apiUrl: string = environment.apiURL;

  constructor(
    private _http: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this._apiUrl}/heroes/listing`);
  }

  getHero(id: string): Observable<Hero> {
    return this._http.get<Hero>(`${this._apiUrl}/heroes/show/${id}`);
  }

  getSuggestions(term: string): Observable<Hero[]> {
    return this._http.post<Hero[]>(`${this._apiUrl}/heroes/search`, {term, limit: 6});
  }

  saveHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(`${this._apiUrl}/heroes/add`, { hero });
  }

  editHero(hero: Hero): Observable<Hero> {
    return this._http.put<Hero>(`${this._apiUrl}/heroes/edit/${hero.uuid}`, { hero });
  }

  deleteHero(id: string): Observable<Hero> {
    return this._http.delete<Hero>(`${this._apiUrl}/heroes/delete/${id}`);
  }
}
