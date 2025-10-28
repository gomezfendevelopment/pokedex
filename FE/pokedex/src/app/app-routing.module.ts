import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonCardComponent } from "./modules/components/pokemonCard/pokemonCard.component";
import { PokemonCardDetailComponent } from "./modules/components/pokemonCardDetail/pokemonCardDetail.component";

export const routes: Routes = [
  { path: "", redirectTo: "pokemon", pathMatch: "full" },
  { path: "pokemon", component: PokemonCardComponent },
  { path: "pokemon/:id", component: PokemonCardDetailComponent },
  { path: "**", redirectTo: "pokemon" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
