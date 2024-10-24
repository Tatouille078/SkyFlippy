import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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
    const[changeIndex, setChangeIndex] = useState(null)

    useEffect(() => {
        const handleSlide = (id) => {
            let lockedValues = 0;
            let unlockCount = -1;
        
            // Calcul des valeurs verrouillées et du nombre de sliders non verrouillés
            if (!lock1) {
                unlockCount++;
            } else lockedValues += slider1;
            
            if (!lock2) {
                unlockCount++;
            } else lockedValues += slider2;
            
            if (!lock3) {
                unlockCount++;
            } else lockedValues += slider3;
            
            if (!lock4) {
                unlockCount++;
            } else lockedValues += slider4;
        
            const remainingRes = 100 - lockedValues; // Somme restante à répartir entre les sliders non verrouillés
    
            switch (id) {
                case 1:
                    const res1 = remainingRes - slider1;
                    if (unlockCount == 2) {
                        if (!lock2 && !lock3) {
                            if (res1 % 2 == 1) {
                                setSlider2(Math.ceil(res1 / 2))
                                setSlider3(Math.floor(res1 / 2))
                            } else {
                                setSlider2(res1 / 2)
                                setSlider3(res1 / 2)
                            }
                        } else if (!lock2 && !lock4) {
                            if (res1 % 2 == 1) {
                                setSlider2(Math.ceil(res1 / 2))
                                setSlider4(Math.floor(res1 / 2))
                            } else {
                                setSlider2(res1 / 2)
                                setSlider4(res1 / 2)
                            }
                        }
                        else {
                            if (res1 % 2 == 1) {
                                setSlider3(Math.ceil(res1 / 2))
                                setSlider4(Math.floor(res1 / 2))
                            } else {
                                setSlider3(res1 / 2)
                                setSlider4(res1 / 2)
                            }
                        }
                    }
                    else if (unlockCount == 1) {
                        if (lock3 && lock4) {
                            setSlider2(res1)
                        }
                        else if (lock2 && lock4) {
                            setSlider3(res1)
                        }
                        else setSlider4(res1)
                    }
                    else {    
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
                    }
                    return;
                case 2:
                    const res2 = remainingRes - slider2;
                    if (res2 % unlockCount == 0) {
                        if (!lock1) setSlider1(res2 / (3-unlockCount))
                        if (!lock3) setSlider3(res2 / (3-unlockCount))
                        if (!lock4) setSlider4(res2 / (3-unlockCount))
                    } else if (res2 % unlockCount == 1) {
                        if (!lock1) setSlider1(Math.ceil(res2 / (3-unlockCount)));     
                        (lock1 && !lock3) ? setSlider3(Math.floor(res2 / (3-unlockCount))) : setSlider3(Math.ceil(res2 / (3-unlockCount)))
                        if (!lock4) setSlider4(Math.floor(res2 / (3-unlockCount)))
                    } else {
                        setSlider1(Math.ceil(res2 / (3-unlockCount)))
                        setSlider3(Math.ceil(res2 / (3-unlockCount)))
                        setSlider4(Math.floor(res2 / (3-unlockCount)))
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
        handleSlide(changeIndex)
    }, [slider1, slider2, slider3, slider4])
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
            lock1,
            lock2,
            lock3,
            lock4,
            setLock1,
            setLock2,
            setLock3,
            setLock4,
            setChangeIndex
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)