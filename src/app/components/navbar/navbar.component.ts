import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    AvatarModule, Ripple, InputTextModule, BadgeModule, ButtonModule, InputIcon, IconField
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: any[] | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Publicaciones',
        icon: 'pi pi-pencil',
        route: 'posts',
      },
    ];
  }

  protected redirect(route: string) {
    this.router.navigateByUrl(route);
  }

}
