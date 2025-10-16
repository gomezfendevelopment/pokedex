import { Component, input, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PokemonService } from '../../services/pokedex.service';
import { Pokemon, PokemonSpecies } from '../../models/pokedex.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PokemonCardComponent implements OnInit {
  pokemon = input<Pokemon[]>();
  species?: PokemonSpecies;

  #pokemonService = inject(PokemonService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (!this.pokemon() || this.pokemon().length === 0) {
      this.loadPokemon();
    } else {
      this.loadSpecies();
    }
  }

  loadPokemon(): void {
    this.#pokemonService
      .getPokemons()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap((data) => {
          if (Array.isArray(data)) {
            this.pokemon.set(
              data.sort((a, b) => {
                const aid = typeof a.id === 'number' ? a.id : Number(a.id ?? 0);
                const bid = typeof b.id === 'number' ? b.id : Number(b.id ?? 0);
                return aid - bid;
              })
            );
          } else {
            this.pokemon.set(data ? [data] : []);
          }

          if (this.pokemon() && this.pokemon().length > 0) {
            this.loadSpecies();
          }
        }),
        catchError((error) => {
          console.error('Error loading pokemons:', error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  loadSpecies(): void {
    if (!this.pokemon() || this.pokemon().length === 0) return;
    const first = this.pokemon()[0];
    if (!first?.species_id) return;

    this.#pokemonService
      .getSpeciesById(first.species_id)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap((speciesData) => (this.species = speciesData)),
        catchError((error) => {
          console.error('Error loading species data:', error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  getTypeColor(type: string): string {
    return this.#pokemonService.getTypeColor(type);
  }

  getTypeClass(p?: Pokemon): string {
    return p?.type1?.toLowerCase() ?? '';
  }

  formatNumber(num: number): string {
    return num.toString().padStart(3, '0');
  }

  getGenderRateText(): string {
    if (!this.species) return '';
    return this.#pokemonService.getGenderRateText(this.species.gender_rate);
  }

  onImageError(p: Pokemon): void {
    console.warn(`Image not found for Pokémon ${p?.name}`);

    if (!p) return;
    p.image_url = this.#pokemonService.getPokemonImageUrl(p.id);
  }
}
