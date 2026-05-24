import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

const MENU_ITEM_LIST = [
  {
    label: 'Feast',
    icon: 'icons/feast.svg',
    routerLink: 'feast',
  },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('skyblock-bazaar');

  readonly menuItemList = MENU_ITEM_LIST;
}
