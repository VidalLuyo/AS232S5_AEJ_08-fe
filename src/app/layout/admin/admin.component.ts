import { Component } from '@angular/core';
import { SidebarAdminComponent } from '../../shared/sidebar-admin/sidebar-admin.component';
import { NavbarAdminComponent } from '../../shared/navbar-admin/navbar-admin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [SidebarAdminComponent, NavbarAdminComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isSidebarExpanded = true;

  onSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
}
