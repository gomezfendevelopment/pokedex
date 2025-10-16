import { Component } from '@angular/core';

import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [PokemonCardComponent],
})
export class NavbarComponent {
  currentView = 'pokemon';
}
