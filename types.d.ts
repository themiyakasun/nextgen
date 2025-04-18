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
  createdAt: string;
}
