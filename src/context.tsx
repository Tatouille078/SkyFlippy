import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ContextProviderProps = {
    children: ReactNode;
}

type ChangeIndexProps = {
    id: number,
    value: number
} // ajouté ca

export type StateContextType = {
    slider1: number;
    slider2: number;
    slider3: number;
    slider4: number;
    setSlider1: React.Dispatch<React.SetStateAction<number>>;
    setSlider2: React.Dispatch<React.SetStateAction<number>>;
    setSlider3: React.Dispatch<React.SetStateAction<number>>;
    setSlider4: React.Dispatch<React.SetStateAction<number>>;
    setChangeIndex: React.Dispatch<React.SetStateAction<ChangeIndexProps>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleOpen: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [slider1, setSlider1] = useState<number>(25)
    const [slider2, setSlider2] = useState<number>(25)
    const [slider3, setSlider3] = useState<number>(25)
    const [slider4, setSlider4] = useState<number>(25)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [changeIndex, setChangeIndex] = useState<ChangeIndexProps>({ id: 0, value: 0 }) // ici aussi

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        // on a changé ca
        const handleSlide = (id: number, value: number) => {
        }
        handleSlide(changeIndex.id, changeIndex.value)
    }, [changeIndex])
    return (
        <StateContext.Provider value={{
            slider1,
            slider2,
            slider3,
            slider4,
            setSlider1,
            setSlider2,
            setSlider3,
            setSlider4,
            setChangeIndex,
            isOpen,
            setIsOpen,
            toggleOpen
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