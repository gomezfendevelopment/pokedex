import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Pokemon,
  PokemonColor,
  PokemonShape,
  PokemonSpecies,
  PokemonType,
} from '../models/pokedex.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Pokémon endpoints
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/pokemon`);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`);
  }

  getPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/pokemon/name/${name}`);
  }

  // Species endpoints
  getSpecies(): Observable<PokemonSpecies[]> {
    return this.http.get<PokemonSpecies[]>(`${this.apiUrl}/pokemon-species`);
  }

  getSpeciesById(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(
      `${this.apiUrl}/pokemon-species/${id}`
    );
  }

  // Colors endpoints
  getColors(): Observable<PokemonColor[]> {
    return this.http.get<PokemonColor[]>(`${this.apiUrl}/pokemon-colors`);
  }

  getColorById(id: number): Observable<PokemonColor> {
    return this.http.get<PokemonColor>(`${this.apiUrl}/pokemon-colors/${id}`);
  }

  // Shapes endpoints
  getShapes(): Observable<PokemonShape[]> {
    return this.http.get<PokemonShape[]>(`${this.apiUrl}/pokemon-shapes`);
  }

  getShapeById(id: number): Observable<PokemonShape> {
    return this.http.get<PokemonShape>(`${this.apiUrl}/pokemon-shapes/${id}`);
  }

  // Types endpoints
  getPokemonTypes(): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>(`${this.apiUrl}/pokemon-types`);
  }

  getTypesByTypeId(typeId: number): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>(
      `${this.apiUrl}/pokemon-types/type/${typeId}`
    );
  }

  // Utility methods
  getPokemonImageUrl(pokemonId: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[type.toLowerCase()] || '#68A090';
  }

  getGenderRateText(genderRate: number): string {
    switch (genderRate) {
      case -1:
        return 'Genderless';
      case 0:
        return '100% Male';
      case 8:
        return '100% Female';
      case 1:
        return '87.5% Male, 12.5% Female';
      case 2:
        return '75% Male, 25% Female';
      case 3:
        return '62.5% Male, 37.5% Female';
      case 4:
        return '50% Male, 50% Female';
      case 5:
        return '37.5% Male, 62.5% Female';
      case 6:
        return '25% Male, 75% Female';
      case 7:
        return '12.5% Male, 87.5% Female';
      default:
        return 'Unknown';
    }
  }
}
