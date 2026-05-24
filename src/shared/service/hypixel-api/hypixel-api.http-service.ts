import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface BazaarProductData {
  product_id: string;
  sell_summary: BazaarProductOrderData[]; // Current top 30 orders for each transaction type
  buy_summary: BazaarProductOrderData[]; // Current top 30 orders for each transaction type
  quick_status: BazaarProductQuickStatusData;
}

interface BazaarProductQuickStatusData {
  productId: string;
  sellPrice: number; // Weighted average of the top 2% of orders by volume
  sellVolume: number; // Sum of item amounts in all orders
  sellMovingWeek: number; // Historic transacted volume from last 7d+ live state
  sellOrders: number; // Count of active orders
  buyPrice: number; // Weighted average of the top 2% of orders by volume
  buyVolume: number; // Sum of item amounts in all orders
  buyMovingWeek: number; // Historic transacted volume from last 7d+ live state
  buyOrders: number; // Count of active orders
}

interface BazaarProductOrderData {
  amount: number;
  pricePerUnit: number;
  orders: number;
}

interface BazaarData {
  success: boolean;
  lastUpdate: number;
  products: Record<string, BazaarProductData>;
}

@Injectable({
  providedIn: 'root',
})
export class HypixelApiHttpService {
  private readonly http = inject(HttpClient);

  private readonly apiBaseUrl = 'https://api.hypixel.net/v2/skyblock';

  getBazaarInfo() {
    return this.http.get<BazaarData>(`${this.apiBaseUrl}/bazaar`);
  }
}
