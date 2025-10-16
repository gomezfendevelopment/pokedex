import { CommonModule } from "@angular/common";
import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Pokemon } from "../../models/pokedex.model";
import { PokemonService } from "../../services/pokedex.service";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class PokemonCardComponent implements OnInit {
  pokemonInput = input<Pokemon[]>();
  pokemon = signal<Pokemon[]>([]);

  #pokemonService = inject(PokemonService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.#pokemonService
      .getPokemons()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap((data) => {
          const sortedData = data.slice().sort((a, b) => {
            const aid = typeof a.id === "number" ? a.id : Number(a.id ?? 0);
            const bid = typeof b.id === "number" ? b.id : Number(b.id ?? 0);
            return aid - bid;
          });

          this.pokemon.set(sortedData);
        }),
        catchError((error) => {
          console.error("Error loading pokemons:", error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  getTypeColor(type: string): string {
    return this.#pokemonService.getTypeColor(type);
  }

  getTypeClass(p?: Pokemon): string {
    return p?.type1?.toLowerCase() ?? "";
  }

  formatNumber(num: number): string {
    return num.toString().padStart(3, "0");
  }

  onImageError(p: Pokemon): void {
    if (!p) return;
    p.image_url = this.#pokemonService.getPokemonImageUrl(p.id);
  }
}
