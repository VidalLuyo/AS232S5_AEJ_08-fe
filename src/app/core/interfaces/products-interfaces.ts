import { SupplierInterface } from './suppliers-interfaces';

export interface ProductsInterfaces {
  productId?: number;
  productName: string;
  descripcion?: string;
  supplier: SupplierInterface;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  status?: string;
  productDate?: string;
}
