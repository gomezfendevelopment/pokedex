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
  templateUrl: "./pokemonCardDetail.component.html",
  styleUrls: ["./pokemonCardDetail.component.scss"],
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
    this.loadPokemon(String(id));
  }

  loadPokemon(id: string): void {
    this.#pokemonService
      .getPokemonById(id)
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

  getHabitatName(habitatId: number): string {
    const habitats: { [key: number]: string } = {
      1: "Grassland",
      2: "Forest",
      3: "Waters-edge",
      4: "Sea",
      5: "Cave",
      6: "Mountain",
      7: "Rough-terrain",
      8: "Urban",
      9: "Rare",
    };
    return habitats[habitatId] || "Unknown";
  }

  getColorName(colorId: number): string {
    const colors: { [key: number]: string } = {
      1: "Black",
      2: "Blue",
      3: "Brown",
      4: "Gray",
      5: "Green",
      6: "Pink",
      7: "Purple",
      8: "Red",
      9: "White",
      10: "Yellow",
    };
    return colors[colorId] || "Unknown";
  }

  getGrowthRateName(growthRateId: number): string {
    const growthRates: { [key: number]: string } = {
      1: "Slow",
      2: "Medium",
      3: "Fast",
      4: "Medium Slow",
      5: "Erratic",
      6: "Fluctuating",
    };
    return growthRates[growthRateId] || "Unknown";
  }

  getGenderRateText(genderRate: number): string {
    if (genderRate === -1) return "Genderless";
    const femalePercentage = (genderRate / 8) * 100;
    const malePercentage = 100 - femalePercentage;
    return `${malePercentage}%♂ / ${femalePercentage}%♀`;
  }

  getShapeName(shapeId: number): string {
    const shapes: { [key: number]: string } = {
      1: "Ball",
      2: "Squiggle",
      3: "Fish",
      4: "Arms",
      5: "Blob",
      6: "Upright",
      7: "Legs",
      8: "Quadruped",
      9: "Wings",
      10: "Tentacles",
      11: "Heads",
      12: "Humanoid",
      13: "Bug-Wings",
      14: "Armor",
    };
    return shapes[shapeId] || "Unknown";
  }

  onImageError(p: PokemonDetail): void {
    if (!p) return;
    p.image_url = this.#pokemonService.getPokemonImageUrl(p.id);
  }
}
