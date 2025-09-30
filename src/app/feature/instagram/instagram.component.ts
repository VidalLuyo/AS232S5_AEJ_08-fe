import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { InstagramInterface } from '../../core/interfaces/instagram.interface';
import { InstagramService } from '../../core/services/instagram.service';

declare var $: any;

@Component({
  selector: 'app-instagram',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {
  profiles: InstagramInterface[] = [];
  filteredProfiles: InstagramInterface[] = [];
  showInactives = false;
  showFilters = false;

  // Filtros
  filterUsername: string = '';
  filterFollowersMin: number | null = null;
  filterFollowersMax: number | null = null;

  constructor(private instagramService: InstagramService) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  toggleList() {
    this.showInactives = !this.showInactives;
    this.loadProfiles();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  loadProfiles() {
    this.instagramService.getAllProfiles().subscribe(data => {
      if (this.showInactives) {
        this.profiles = data.filter(p => p.status === 'I');
      } else {
        this.profiles = data.filter(p => p.status === 'A');
      }
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProfiles = this.profiles.filter(profile => {
      const usernameMatch = !this.filterUsername ||
        profile.username.toLowerCase().includes(this.filterUsername.toLowerCase());

      const followersMinMatch = this.filterFollowersMin === null ||
        (profile.followers || 0) >= this.filterFollowersMin;

      const followersMaxMatch = this.filterFollowersMax === null ||
        (profile.followers || 0) <= this.filterFollowersMax;

      return usernameMatch && followersMinMatch && followersMaxMatch;
    });

    this.reloadDataTable();
  }

  reloadDataTable() {
    if ($.fn.DataTable.isDataTable('#instagramTable')) {
      $('#instagramTable').DataTable().clear().destroy();
    }

    setTimeout(() => {
      $('#instagramTable').DataTable({
        paging: true,
        pageLength: 7,
        lengthMenu: [5, 10, 25],
        responsive: true,
        dom: 'tip',
        language: {
          lengthMenu: "Mostrar _MENU_ registros",
          info: "Mostrando _START_ a _END_ de _TOTAL_ perfiles",
          paginate: {
            first: "«",
            last: "»",
            next: "▶",
            previous: "◀"
          },
          zeroRecords: "No se encontraron resultados"
        }
      });
    }, 100);
  }

  clearFilters() {
    this.filterUsername = '';
    this.filterFollowersMin = null;
    this.filterFollowersMax = null;
    this.loadProfiles();
  }

  async deleteProfile(id: number | undefined) {
    if (id === undefined) return;

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el perfil.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      this.instagramService.deleteProfile(id).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El perfil fue eliminado correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          this.loadProfiles();
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el perfil.',
            icon: 'error',
          });
        }
      });
    }
  }

  async restoreProfile(id: number | undefined) {
    if (id === undefined) return;

    const result = await Swal.fire({
      title: '¿Restaurar perfil?',
      text: 'El perfil volverá a estar activo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      this.instagramService.reactivateProfile(id).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Restaurado!',
            text: 'El perfil fue restaurado.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          this.loadProfiles();
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo restaurar el perfil.',
            icon: 'error',
          });
        }
      });
    }
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
