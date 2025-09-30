import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstagramInterface } from '../interfaces/instagram.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private apiUrl = `${environment.apiUrl}/instagram`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Listar todos los perfiles
  getAllProfiles(): Observable<InstagramInterface[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<InstagramInterface[]>(`${this.apiUrl}/profiles`, { headers });
  }

  // Obtener perfil por ID
  getProfileById(id: number): Observable<InstagramInterface> {
    const headers = this.getAuthHeaders();
    return this.http.get<InstagramInterface>(`${this.apiUrl}/profile/${id}`, { headers });
  }

  // Crear perfil
  createProfile(profile: InstagramInterface): Observable<InstagramInterface> {
    const headers = this.getAuthHeaders();
    return this.http.post<InstagramInterface>(`${this.apiUrl}/profile`, profile, { headers });
  }

  // Actualizar perfil
  updateProfile(id: number, profile: InstagramInterface): Observable<InstagramInterface> {
    const headers = this.getAuthHeaders();
    return this.http.put<InstagramInterface>(`${this.apiUrl}/profile/${id}`, profile, { headers });
  }

  // Eliminar lógicamente
  deleteProfile(id: number): Observable<InstagramInterface> {
    const headers = this.getAuthHeaders();
    return this.http.put<InstagramInterface>(`${this.apiUrl}/profile/delete/${id}`, {}, { headers });
  }

  // Reactivar perfil
  reactivateProfile(id: number): Observable<InstagramInterface> {
    const headers = this.getAuthHeaders();
    return this.http.put<InstagramInterface>(`${this.apiUrl}/profile/reactivate/${id}`, {}, { headers });
  }
}
