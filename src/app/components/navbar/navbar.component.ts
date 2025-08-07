import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth/auth.service';

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
  protected items: { label: string, icon: string, route: string }[] = [
    {
      label: 'Publicaciones', icon: 'pi pi-pencil', route: 'posts',
    },
  ];

  constructor(private router: Router, protected authService: AuthService) { }

  async ngOnInit() {
    try {
      await this.authService.loadUser();
    } catch (error) {

    }
  }

  protected redirectProfile() {
    if (this.authService.userLogin) {
      this.router.navigateByUrl(`profile/${this.authService.userLogin?.uuid}`);
    }
  }

  protected redirect(route: string, logged: boolean = false) {
    if (logged && this.authService.userLogin) {
      this.router.navigateByUrl(route);
    }
    this.router.navigateByUrl(route);

  }

  protected async logout() {
    await this.authService.logout();
    this.authService.userLogin = null;
    console.log(this.authService.userLogin);
    this.redirect('auth/sign-in');
  }

}
