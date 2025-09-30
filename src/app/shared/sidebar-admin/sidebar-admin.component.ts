import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css'],
  standalone: true,
  imports: [RouterModule, MatIconModule, MatTooltipModule, MatDividerModule, MatButtonModule, MatMenuModule, CommonModule]
})
export class SidebarAdminComponent implements OnInit {
  isExpanded = true;
  isMobileView = false;
  usuarioNombre: string = '';
  userRole: string = '';

  @Output() toggleExpand = new EventEmitter<boolean>();

  menuItems = [
    {
      group: 'INICIO',
      items: [
        { icon: 'dashboard', label: 'Inicio', route: 'inicio', roles: ['ADMIN', 'EMPLEADO'] },
        { icon: 'trending_up', label: 'Análisis', route: '/analytics', roles: ['ADMIN'] }
      ]
    },
    {
      group: 'FINANCIAL',
      items: [
        { icon: 'local_shipping', label: 'Proveedores', route: '/proveedores', roles: ['ADMIN'] },
        { icon: 'person_add', label: 'Empleado', route: 'employees', roles: ['ADMIN'] },
        { icon: 'groups', label: 'Clientes', route: 'client', roles: ['ADMIN', 'EMPLEADO'] },
        { icon: 'inventory', label: 'Instagram', route: '/instagram' }
      ]
    },
    {
      group: 'OPERACIONES',
      items: [
        { icon: 'shopping_cart', label: 'Ventas', route: 'sales', roles: ['ADMIN', 'EMPLEADO'] },
        { icon: 'credit_card', label: 'Compras', route: 'purchases', roles: ['ADMIN', 'EMPLEADO'] },
        { icon: 'attach_money', label: 'Ingresos', route: '/ingresos', roles: ['ADMIN'] },
        { icon: 'money_off', label: 'Egresos', route: '/egresos', roles: ['ADMIN'] }
      ]
    },
    {
      group: 'KARDEX',
      items: [
        { icon: 'sync_alt', label: 'Movimientos', route: '/kardex/movimientos', roles: ['ADMIN'] }
      ]
    }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('usuarioActivo');
    if (userData) {
      const user = JSON.parse(userData);
      this.usuarioNombre = user.username;
      this.userRole = user.role || 'Desconocido';
    }
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.toggleExpand.emit(this.isExpanded);
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  isAdminOrEmpleado(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'EMPLEADO';
  }

  // Verificar si el item debe mostrarse según el rol
  canShowItem(item: any): boolean {
    if (!item.roles) return true;
    return item.roles.includes(this.userRole);
  }

  // Verificar si el grupo tiene items visibles
  hasVisibleItems(group: any): boolean {
    return group.items.some((item: any) => this.canShowItem(item));
  }

  // Obtener items visibles de un grupo
  getVisibleItems(group: any): any[] {
    return group.items.filter((item: any) => this.canShowItem(item));
  }

  // Función de logout simple
  logout(): void {
    Swal.fire({
      title: '¿Cerrar Sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioActivo');
        this.router.navigate(['/login']);
      }
    });
  }
}
