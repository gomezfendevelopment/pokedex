import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './modules/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokedex';
}
