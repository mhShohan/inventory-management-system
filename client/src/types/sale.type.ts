export interface ISaleItem {
  product: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface IStockInsufficientItem {
  product: string;
  productName: string;
  requestedQuantity: number;
  currentStock: number;
  reason: string;
}

export interface ISale {
  product?: string;
  productName?: string;
  productPrice?: number;
  quantity?: number;
  items?: ISaleItem[];
  buyerName: string;
  date: string;
  price?: number;
}

export interface ITableSale {
  _id: string;
  product?: {
    _id: string;
    name: string;
    price: number;
  }
  productPrice?: number;
  productName?: string;
  quantity?: number;
  buyerName: string;
  date: string;
  totalPrice: number;
  items?: ISaleItem[];
}