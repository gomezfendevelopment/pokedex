import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PokemonDetail } from "../../models/pokedex.model";
import { PokemonService } from "../../services/pokedex.service";

@Component({
  selector: "app-pokemon-car-detail",
  templateUrl: "./pokemon-card detail.component.html",
  styleUrls: ["./pokemon-card detail.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class PokemonCardDetailComponent implements OnInit {
  pokemon = signal<PokemonDetail>({} as PokemonDetail);

  #pokemonService = inject(PokemonService);
  #destroyRef = inject(DestroyRef);
  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getPokemonId();
  }

  formatNumber(num: number): string {
    return num?.toString().padStart(3, "0");
  }

  getTypeColor(type: string): string {
    if (!type) return "";
    return this.#pokemonService.getTypeColor(type);
  }

  getTypeClass(p?: PokemonDetail): string {
    return p?.type1?.toLowerCase() ?? "";
  }

  getPokemonId() {
    const id = this.#route.snapshot.paramMap.get("id");
    this.loadPokemon(id);
  }

  loadPokemon(id: string | null): void {
    this.#pokemonService
      .getPokemonById(Number(id))
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap((data) => {
          this.pokemon.set(data);
        }),
        catchError((error) => {
          console.error("Error loading pokemons:", error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
