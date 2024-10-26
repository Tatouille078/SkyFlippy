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
    lock1: boolean;
    lock2: boolean;
    lock3: boolean;
    lock4: boolean;
    setLock1: React.Dispatch<React.SetStateAction<boolean>>;
    setLock2: React.Dispatch<React.SetStateAction<boolean>>;
    setLock3: React.Dispatch<React.SetStateAction<boolean>>;
    setLock4: React.Dispatch<React.SetStateAction<boolean>>;
    setChangeIndex: React.Dispatch<React.SetStateAction<ChangeIndexProps>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleOpen: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps>  = ({ children }) => {
    const [slider1, setSlider1] = useState<number>(25)
    const [lock1, setLock1] = useState<boolean>(false)
    const [slider2, setSlider2] = useState<number>(25)
    const [lock2, setLock2] = useState<boolean>(false)
    const [slider3, setSlider3] = useState<number>(25)
    const [lock3, setLock3] = useState<boolean>(false)
    const [slider4, setSlider4] = useState<number>(25)
    const [lock4, setLock4] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [changeIndex, setChangeIndex] = useState<ChangeIndexProps>({id:0, value:0}) // ici aussi

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }
    
    useEffect(() => {
        // on a changé ca
        const handleSlide = (id: number, value: number) => { 
            let lockedValues = 0;
            let unlockCount = -1;
        
            if (!lock1) {
                unlockCount++;
            } else lockedValues += id != 1 ? slider1 : value;
            
            if (!lock2) {
                unlockCount++;
            } else lockedValues += id != 2 ? slider2 : value;
            
            if (!lock3) {
                unlockCount++;
            } else lockedValues += id != 3 ? slider3 : value;
            
            if (!lock4) {
                unlockCount++;
            } else lockedValues += id != 4 ? slider4 : value;
        
            const remainingRes = 100 - lockedValues;
            const overflow = remainingRes - value;

            if (overflow < 0) {
                if (!lock1) (id == 1) ? setSlider1(value - overflow) : setSlider1(value) 
                if (!lock2) (id == 2) ? setSlider2(value - overflow) : setSlider2(value) 
                if (!lock3) (id == 3) ? setSlider3(value - overflow) : setSlider3(value) 
                if (!lock4) (id == 4) ? setSlider4(value - overflow) : setSlider4(value) 
                    
                return;
            } 
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
                    if (unlockCount == 2) {
                        if (!lock1 && !lock3) {
                            if (res2 % 2 == 1) {
                                setSlider1(Math.ceil(res2 / 2))
                                setSlider3(Math.floor(res2 / 2))
                            } else {
                                setSlider1(res2 / 2)
                                setSlider3(res2 / 2)
                            }
                        } else if (!lock1 && !lock4) {
                            if (res2 % 2 == 1) {
                                setSlider1(Math.ceil(res2 / 2))
                                setSlider4(Math.floor(res2 / 2))
                            } else {
                                setSlider1(res2 / 2)
                                setSlider4(res2 / 2)
                            }
                        }
                        else {
                            if (res2 % 2 == 1) {
                                setSlider3(Math.ceil(res2 / 2))
                                setSlider4(Math.floor(res2 / 2))
                            } else {
                                setSlider3(res2 / 2)
                                setSlider4(res2 / 2)
                            }
                        }
                    }
                    else if (unlockCount == 1) {
                        if (lock3 && lock4) {
                            setSlider1(res2)
                        }
                        else if (lock1 && lock4) {
                            setSlider3(res2)
                        }
                        else setSlider4(res2)
                    }
                    else {    
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
                    }
                    return;
                case 3:
                    const res3 = remainingRes - slider3;
                    if (unlockCount == 2) {
                        if (!lock1 && !lock2) {
                            if (res3 % 2 == 1) {
                                setSlider1(Math.ceil(res3 / 2))
                                setSlider2(Math.floor(res3 / 2))
                            } else {
                                setSlider1(res3 / 2)
                                setSlider2(res3 / 2)
                            }
                        } else if (!lock1 && !lock4) {
                            if (res3 % 2 == 1) {
                                setSlider1(Math.ceil(res3 / 2))
                                setSlider4(Math.floor(res3 / 2))
                            } else {
                                setSlider1(res3 / 2)
                                setSlider4(res3 / 2)
                            }
                        }
                        else {
                            if (res3 % 2 == 1) {
                                setSlider2(Math.ceil(res3 / 2))
                                setSlider4(Math.floor(res3 / 2))
                            } else {
                                setSlider2(res3 / 2)
                                setSlider4(res3 / 2)
                            }
                        }
                    }
                    else if (unlockCount == 1) {
                        if (lock2 && lock4) {
                            setSlider1(res3)
                        }
                        else if (lock1 && lock4) {
                            setSlider2(res3)
                        }
                        else setSlider4(res3)
                    }
                    else {    
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
                    }
                    return;
                case 4:
                    const res4 = remainingRes - slider4;
                    if (unlockCount == 2) {
                        if (!lock1 && !lock2) {
                            if (res4 % 2 == 1) {
                                setSlider1(Math.ceil(res4 / 2))
                                setSlider2(Math.floor(res4 / 2))
                            } else {
                                setSlider1(res4 / 2)
                                setSlider2(res4 / 2)
                            }
                        } else if (!lock1 && !lock3) {
                            if (res4 % 2 == 1) {
                                setSlider1(Math.ceil(res4 / 2))
                                setSlider3(Math.floor(res4 / 2))
                            } else {
                                setSlider1(res4 / 2)
                                setSlider3(res4 / 2)
                            }
                        }
                        else {
                            if (res4 % 2 == 1) {
                                setSlider2(Math.ceil(res4 / 2))
                                setSlider3(Math.floor(res4 / 2))
                            } else {
                                setSlider2(res4 / 2)
                                setSlider3(res4 / 2)
                            }
                        }
                    }
                    else if (unlockCount == 1) {
                        if (lock2 && lock3) {
                            setSlider1(res4)
                        }
                        else if (lock1 && lock3) {
                            setSlider2(res4)
                        }
                        else setSlider3(res4)
                    }
                    else {    
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
                    }
                    return;
                default:
                    return;     
            }
        }
        // var temp = 0
        // if (changeIndex.value < 0) temp = 0
        // else if (changeIndex.value > 100) temp = 100
        // else temp = changeIndex.value
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
            lock1,
            lock2,
            lock3,
            lock4,
            setLock1,
            setLock2,
            setLock3,
            setLock4,
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