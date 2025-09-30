import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsInterfaces } from '../interfaces/products-interfaces';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsServicesService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  // Function to get the token from localStorage and set Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Add token to headers
  }

  // List active products
  getActiveProducts(): Observable<ProductsInterfaces[]> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.get<ProductsInterfaces[]>(this.apiUrl, { headers });
  }

  // List inactive products
  getInactiveProducts(): Observable<ProductsInterfaces[]> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.get<ProductsInterfaces[]>(`${this.apiUrl}/inactivos`, { headers });
  }

  // Get product by ID
  getProductById(id: number): Observable<ProductsInterfaces> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.get<ProductsInterfaces>(`${this.apiUrl}/${id}`, { headers });
  }

  // Create a new product
  createProduct(product: ProductsInterfaces): Observable<ProductsInterfaces> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.post<ProductsInterfaces>(this.apiUrl, product, { headers });
  }

  // Update product
  updateProduct(id: number, product: ProductsInterfaces): Observable<ProductsInterfaces> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.put<ProductsInterfaces>(`${this.apiUrl}/actualizar/${id}`, product, { headers });
  }

  // Logical deletion of product (change state to 'I')
  deleteProduct(id: number): Observable<ProductsInterfaces> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.put<ProductsInterfaces>(`${this.apiUrl}/eliminadologico/${id}`, {}, { headers });
  }

  // Reactivate product (change state to 'A')
  restoreProduct(id: number): Observable<ProductsInterfaces> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.put<ProductsInterfaces>(`${this.apiUrl}/reactivar/${id}`, {}, { headers });
  }

  // Physical deletion of product
  deleteProductPhysically(id: number): Observable<void> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.delete<void>(`${this.apiUrl}/eliminadofisico/${id}`, { headers });
  }

  // Generate PDF report for active products
  generateActiveProductReport(): Observable<Blob> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.get(`${this.apiUrl}/pdf`, { headers, responseType: 'blob' });
  }

  // Generate PDF report for inactive products
  generateInactiveProductReport(): Observable<Blob> {
    const headers = this.getAuthHeaders();  // Add the Authorization header
    return this.http.get(`${this.apiUrl}/pdf/Inactivos`, { headers, responseType: 'blob' });
  }
}
