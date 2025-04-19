interface AuthCredentials {
  name: string;
  email: string;
  password: string;
}

interface Category {
  id: string;
  category: string;
  image: string;
}

interface Brand {
  id: string;
  brand: string;
  logo: string;
}

interface Series {
  id: string;
  seriesName: string;
  categoryId: string;
  brandId: string;
  createdAt: Date | null;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  modelNumber: string;
  price: number;
  discount: number;
  stockQuantity: number;
  warrantyPeriod: string;
  isFeatured: boolean;
  isActive: boolean;
  createAt: Date;
  updatedAt: Date;
  categoryId: string;
  brandId: string;
  seriesId: string;
}

interface ProductImage {
  id: string;
  productId: string;
  image: string;
  isPrimary;
}
