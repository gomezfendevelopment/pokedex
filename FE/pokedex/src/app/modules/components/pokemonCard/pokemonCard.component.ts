import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, RouterModule } from "@angular/router";
import { EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Pokemon } from "../../models/pokedex.model";
import { PokemonService } from "../../services/pokedex.service";

export interface Products {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemonCard.component.html",
  styleUrls: ["./pokemonCard.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PokemonCardComponent implements OnInit {
  pokemon = signal<Pokemon[]>([]);

  #pokemonService = inject(PokemonService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
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
    if (!type) return "";
    return this.#pokemonService.getTypeColor(type);
  }

  getTypeClass(p?: Pokemon): string {
    if (!p) return "";
    return p?.type1?.toLowerCase() ?? "";
  }

  formatNumber(num: number): string {
    return num.toString().padStart(3, "0");
  }

  onImageError(p: Pokemon): void {
    if (!p) return;
    p.image_url = this.#pokemonService.getPokemonImageUrl(p.id);
  }

  pokemonDetails(id: number): void {
    if (id == null) return;
    console.log("Pokemon ID:", id);
    this.#router.navigate(["/pokemon", id]);
  }
}
