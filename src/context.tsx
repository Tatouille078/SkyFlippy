import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextProviderProps = {
    children: ReactNode;
}

const StateContext = createContext({});

export const ContextProvider: React.FC<ContextProviderProps>  = ({ children }) => {
    const[slider1, setSlider1] = useState(25)
    const[lock1, setLock1] = useState(false)
    const[slider2, setSlider2] = useState(25)
    const[lock2, setLock2] = useState(false)
    const[slider3, setSlider3] = useState(25)
    const[lock3, setLock3] = useState(false)
    const[slider4, setSlider4] = useState(25)
    const[lock4, setLock4] = useState(false)

    const handleSlide = (id) => {
        switch (id) {
            case 1:
                const res1 = 100-slider1;
                if (res1 % 3 == 1) {
                    setSlider2(Math.ceil(res1 / 3))
                    setSlider3(Math.floor(res1 / 3))
                    setSlider4(Math.floor(res1 / 3))
                } else if (res1 % 3 == 2) {
                    setSlider2(Math.ceil(res1 / 3))
                    setSlider3(Math.ceil(res1 / 3))
                    setSlider4(Math.floor(res1 / 3))
                } else {
                    setSlider2(res1 / 3)
                    setSlider3(res1 / 3)
                    setSlider4(res1 / 3)
                }
                return;
            case 2:
                const res2 = 100-slider2;
                if (res2 % 3 == 1) {
                    setSlider1(Math.ceil(res2 / 3))
                    setSlider3(Math.floor(res2 / 3))
                    setSlider4(Math.floor(res2 / 3))
                } else if (res2 % 3 == 2) {
                    setSlider1(Math.ceil(res2 / 3))
                    setSlider3(Math.ceil(res2 / 3))
                    setSlider4(Math.floor(res2 / 3))
                } else {
                    setSlider1(res2 / 3)
                    setSlider3(res2 / 3)
                    setSlider4(res2 / 3)
                }
                return;
            case 3:
                const res3 = 100-slider3;
                if (res3 % 3 == 1) {
                    setSlider1(Math.ceil(res3 / 3))
                    setSlider2(Math.floor(res3 / 3))
                    setSlider4(Math.floor(res3 / 3))
                } else if (res3 % 3 == 2) {
                    setSlider1(Math.ceil(res3 / 3))
                    setSlider2(Math.ceil(res3 / 3))
                    setSlider4(Math.floor(res3 / 3))
                } else {
                    setSlider1(res3 / 3)
                    setSlider2(res3 / 3)
                    setSlider4(res3 / 3)
                }
                return;
            case 4:
                const res4 = 100-slider4;
                if (res4 % 3 == 1) {
                    setSlider1(Math.ceil(res4 / 3))
                    setSlider2(Math.floor(res4 / 3))
                    setSlider3(Math.floor(res4 / 3))
                } else if (res4 % 3 == 2) {
                    setSlider1(Math.ceil(res4 / 3))
                    setSlider2(Math.ceil(res4 / 3))
                    setSlider3(Math.floor(res4 / 3))
                } else {
                    setSlider1(res4 / 3)
                    setSlider2(res4 / 3)
                    setSlider3(res4 / 3)
                }
                return;
            default:
                return;     
        }
    }
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
            handleSlide,
            lock1,
            lock2,
            lock3,
            lock4,
            setLock1,
            setLock2,
            setLock3,
            setLock4
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)