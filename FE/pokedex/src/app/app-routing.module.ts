import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonCardDetailComponent } from "./modules/components/pokemon-card detail/pokemon-card detail.component";
import { PokemonCardComponent } from "./modules/components/pokemon-card/pokemon-card.component";
import { SpeciesComponent } from "./modules/components/shapes/species.component";

export const routes: Routes = [
  { path: "", redirectTo: "pokemon", pathMatch: "full" },
  { path: "pokemon", component: PokemonCardComponent },
  { path: "pokemon/:id", component: PokemonCardDetailComponent },
  { path: "species", component: SpeciesComponent },
  // { path: "colors", component: ColorsComponent },
  // { path: "shapes", component: ShapesComponent },
  { path: "**", redirectTo: "pokemon" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
