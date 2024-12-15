import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { getFinalScore, marge, offreDemande, popularity, prix, Product } from './Calculus';
import { Item } from './api';

type ContextProviderProps = {
    children: ReactNode;
}

type Theme = {
    id: string;
    label: string;
} 

export type StateContextType = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSettingsOpen: boolean;
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleOpen: () => void;
    toggleSettings: () => void;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    sortedList: Product[];
    pagination: number;
    setPagination: React.Dispatch<React.SetStateAction<number>>;
    createProductFromItem: (item: Item) => void;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    getItem: <T>(key: string) => T | null;
    setItem: <T>(key: string, value: T) => void;
    themes: Theme[];
    currentTheme: string;
    setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
    toggleTheme: (theme: string) => void;
}

const quickSort = (arr: Product[]): Product[] => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].finalScore != null && arr[i].finalScore < pivot.finalScore) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [pagination, setPagination] = useState<number>(12)
    const [search, setSearch] = useState("")
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("currentTheme") || 'theme-light')

    const toggleOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleSettings = () => {
        setIsSettingsOpen(prev => !prev);
    }

    const themes: Theme[] = [
        { id: 'theme-rose', label: 'Rose Theme' },
        { id: 'theme-darkRose', label: 'Dark Rose Theme' },
        { id: 'theme-apple', label: 'Apple Theme' },
        { id: 'theme-darkApple', label: 'Dark Apple Theme' },
    ];

    const createProductFromItem = (item: Item) => {
        const p: Product = {
            productID: item.product_id,
            sellPrice: item.quick_status.sellPrice,
            sellVolume: item.quick_status.sellVolume,
            buyPrice: item.quick_status.buyPrice,
            buyVolume: item.quick_status.buyVolume,
            finalScore: null,
            marge: marge(item.quick_status.buyPrice, item.quick_status.sellPrice),
            prix: prix(item.quick_status.buyPrice),
            offreDemande: offreDemande(item.quick_status.buyVolume, item.quick_status.sellVolume),
            popularity: popularity(item.quick_status.buyPrice, item.quick_status.buyVolume, item.quick_status.sellVolume)
        }
        p.finalScore = getFinalScore(p)
        setProducts((prev) => [...prev, p])
    }
    const sortedList = useMemo(() => {
        var goodP = products.filter(p => p.finalScore == null || !isNaN(p.finalScore))
        if (search.length > 3) {
            goodP = goodP.filter(p => p.productID.toLowerCase().includes(search.toLowerCase()))
        }
        const sortedP = quickSort(goodP).reverse()
        return sortedP.slice(0, pagination)
    },
        [products, pagination, search]
    )

    const toggleTheme = (theme: string) => {
        setCurrentTheme(theme)
        localStorage.setItem('currentTheme', theme)
    }

    const getItem = <T,>(key: string): T | null => {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    }

    const setItem = <T,>(key: string, value: T) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    return (
        <StateContext.Provider value={{
            isSidebarOpen,
            setIsSidebarOpen,
            isSettingsOpen,
            setIsSettingsOpen,
            toggleOpen,
            toggleSettings,
            sortedList,
            setProducts,
            products,
            pagination,
            setPagination,
            createProductFromItem,
            search,
            setSearch,
            getItem,
            setItem,
            themes,
            currentTheme,
            setCurrentTheme,
            toggleTheme
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) throw new Error('useStateContext must be used within a ContextProvider');
    return context;
};