import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pokemon, PokemonDetail } from "../models/pokedex.model";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private apiUrl = "http://localhost:8080/api";

  #http = inject(HttpClient);

  // Pokémon endpoints
  getPokemons(): Observable<Pokemon[]> {
    return this.#http.get<Pokemon[]>(`${this.apiUrl}/pokemon`);
  }

  getPokemonById(id: string): Observable<PokemonDetail> {
    return this.#http.get<PokemonDetail>(`${this.apiUrl}/pokemon/${id}`);
  }

  // Utility methods
  getPokemonImageUrl(pokemonId: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };
    return typeColors[type.toLowerCase()] || "#68A090";
  }

  getGenderRateText(genderRate: number): string {
    switch (genderRate) {
      case -1:
        return "Genderless";
      case 0:
        return "100% Male";
      case 8:
        return "100% Female";
      case 1:
        return "87.5% Male, 12.5% Female";
      case 2:
        return "75% Male, 25% Female";
      case 3:
        return "62.5% Male, 37.5% Female";
      case 4:
        return "50% Male, 50% Female";
      case 5:
        return "37.5% Male, 62.5% Female";
      case 6:
        return "25% Male, 75% Female";
      case 7:
        return "12.5% Male, 87.5% Female";
      default:
        return "Unknown";
    }
  }
}
