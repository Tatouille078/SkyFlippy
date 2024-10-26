type SellSummary = {
    amount: number;
    pricePerUnit: number;
    orders: number;  
}
  
type BuySummary = {
    amount: number;
    pricePerUnit: number;
    orders: number;  
}
  
type QuickStatus = {
    productId: string;
    sellPrice: number;
    sellVolume: number;
    sellMovingWeek: number;
    sellOrders: number;
    buyPrice: number;
    buyVolume: number;
    buyMovingWeek: number;
    buyOrders: number;  
}
  
export type Item = {
    product_id: string;
    sell_summary: SellSummary[];
    buy_summary: BuySummary[];
    quick_status: QuickStatus;
}

export type ProductType = {
    success: boolean;
    lastUpdated: number;
    products: Item[];
}

const getProducts = async () => {
    const data = await fetch("https://api.hypixel.net/v2/skyblock/bazaar")
    return await data.json()
} 

export default getProducts