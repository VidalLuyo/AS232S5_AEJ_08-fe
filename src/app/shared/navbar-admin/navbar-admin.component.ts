import { Component, Input } from '@angular/core';  // Importar Input
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';  // Importar MatBadgeModule

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
  standalone: true,  // Define como componente standalone
  imports: [RouterModule, MatIconModule, MatBadgeModule]  // Añadir MatBadgeModule aquí
})
export class NavbarAdminComponent {
  @Input() isSidebarExpanded = true;  // Define como @Input() para recibirlo desde el componente padre
  currentPageTitle = 'Inicio';
}
