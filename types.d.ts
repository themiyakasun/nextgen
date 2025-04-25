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

interface ProductDetails {
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
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  brandId: string;
  seriesId: string;
  specs: {
    id: string;
    specName: string;
    specValue: string;
    productId: string;
  }[];
  images: {
    id: string;
    image: string;
    productId: string;
    isPrimary: boolean | null;
  }[];
  brand: {
    id: string;
    brand: string;
    logo: string;
  };
}

interface ProductImage {
  id: string;
  productId: string;
  image: string;
  isPrimary;
}

interface CartItem {
  cart: {
    id: string;
    productId: string | null;
    userId: string | null;
    quantity: number;
    createdAt: Date | null;
  };
  product: {
    id: string;
    name: string;
    price: number;
    discount: number | null;
  } | null;
}
