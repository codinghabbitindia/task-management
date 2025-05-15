import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NAV_ITEMS } from '../../utils/constants';
import { NavItem } from '../../models/navItems';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  navItems: NavItem[] = NAV_ITEMS;

  constructor(private router: Router) { }

  navigateTo(route: string, id?: string) {
    if (id) {
      route = route.replace(':id', id);
    }
    this.router.navigate([route]);
  }
}
