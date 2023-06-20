import { Injectable } from '@angular/core';
import { Menu } from '../modal/menu';

@Injectable({
  providedIn: 'root'
})
export class SharedmenuserviceService {

  newmenu: Menu[] = [];

  addToMenu(menuItem: Menu) {
    this.newmenu.push(menuItem);
  }

  getMenu() {
    return this.newmenu;
  }

  clearMenu() {
    this.newmenu = [];
  }

}
