const margeWeight = 0.25
const prixWeight = 0.25
const offreDemandeWeight = 0.25
const popularityWeight = 0.25

function prix(buyPriceProduct: number): number {
    const rise = 1 / (1 + Math.exp(-0.015 * (buyPriceProduct - 450)));
    const fall = 1 / (1 + Math.exp(0.0001 * (buyPriceProduct - 50000)));

    const prixScore = (25.25 * (rise * fall) / Math.max(rise, fall));
    return prixScore >= 25 ? 25 : prixScore;
}


function normalPdf(x: number, mean: number, stdDev: number): number {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

function marge(buyPriceProduct: number, sellPriceProduct: number): number {
    const margePercent = 100 - ((sellPriceProduct * 100) / buyPriceProduct);
    const y = normalPdf(margePercent, 15, 5);

    // Generate y_max by simulating the max value of the PDF across a range of values.
    const yValues = Array.from({ length: 1000 }, (_, i) => normalPdf(i * (30 / 1000), 15, 5));
    const y_max = Math.max(...yValues);

    return y * (25 / y_max);
}


function offreDemande(buyVolumeProduct: number, sellVolumeProduct: number): number {
    let x: number;

    if (buyVolumeProduct <= sellVolumeProduct) {
        x = (sellVolumeProduct * 100) / buyVolumeProduct;
    } else {
        x = (buyVolumeProduct * 100) / sellVolumeProduct;
    }

    if (x <= 75) {
        return 25;
    } else if (x > 75 && x <= 600) {
        const slope = -25 / 525;
        return slope * (x - 75) + 25;
    }

    return 0;
}


function popularity(buyPriceProduct: number, buyVolumeProduct: number, sellVolumeProduct: number): number {
    const buySellSum = Math.floor((buyVolumeProduct + sellVolumeProduct) / 1000);

    if (buyPriceProduct <= 1000) {
        if (buySellSum <= 500) {
            return 0;
        } else if (buySellSum > 500 && buySellSum <= 1500) {
            return (12.5 / 1000) * (buySellSum - 500);
        } else if (buySellSum > 1500 && buySellSum <= 6000) {
            return (12.5 / 4500) * (buySellSum - 1500) + 12.5;
        }
        return 25;
    } else if (buyPriceProduct > 1000 && buyPriceProduct <= 50000) {
        if (buySellSum <= 100) {
            return 0;
        } else if (buySellSum > 100 && buySellSum <= 400) {
            return (12.5 / 300) * (buySellSum - 100);
        } else if (buySellSum > 400 && buySellSum <= 1000) {
            return (12.5 / 600) * (buySellSum - 500) + 12.5;
        }
        return 25;
    } 

    if (buySellSum <= 5) {
        return 0;
    } else if (buySellSum > 5 && buySellSum <= 25) {
        return (12.5 / 20) * (buySellSum - 5);
    } else if (buySellSum > 25 && buySellSum <= 80) {
        return (12.5 / 55) * (buySellSum - 25) + 12.5;
    }
    
    return 25;
}


function getFinalScore(product: Product): number | null {
    try {
        if (product.marge == null || product.prix == null || product.offreDemande == null || product.popularity == null) {
            throw new Error()
        }
        return Math.floor(
            ((product.marge * margeWeight) +
            (product.prix * prixWeight) +
            (product.offreDemande * offreDemandeWeight) +
            (product.popularity * popularityWeight)) * 4
        );
    } catch (error) {
        console.error("Error calculating the final score");
        return null
    }
}


type Product = {
    productID: string;
    sellPrice: number;
    sellVolume: number;
    buyPrice: number;
    buyVolume: number;
    finalScore: number | null;
    marge: number | null;
    prix: number | null;
    offreDemande: number | null;
    popularity: number | null;
};

class Scores {
    products: Product[];

    constructor() {
        this.products = [];
    }

    refreshProducts(data: { [pID: string]: { quick_status: any } }): void {
        this.products = Object.keys(data).map((pID) => this.retrieveProduct(data[pID].quick_status));
    }

    retrieveProduct(raw_product: any): Product {
        return {
            productID: raw_product.productId,
            sellPrice: parseFloat(raw_product.sellPrice),
            sellVolume: parseFloat(raw_product.sellVolume) < 1 ? 1 : parseFloat(raw_product.sellVolume),
            buyPrice: parseFloat(raw_product.buyPrice) < 0.1 ? 1 : parseFloat(raw_product.buyPrice),
            buyVolume: parseFloat(raw_product.buyVolume) < 1 ? 1 : parseFloat(raw_product.buyVolume),
            finalScore: null,
            marge: null,
            prix: null,
            offreDemande: null,
            popularity: null
        };
    }

    addCustomScores(): void {
        for (const product of this.products) {
            try {
                product.marge = marge(product.buyPrice, product.sellPrice);
                product.prix = prix(product.buyPrice);
                product.offreDemande = offreDemande(product.buyVolume, product.sellVolume);
                product.popularity = popularity(product.buyPrice, product.buyVolume, product.sellVolume);
                product.finalScore = getFinalScore(product);
            } catch (error) {
                console.error("Error in calculating scores:", error);
            }
        }
    }
}

export default Scores