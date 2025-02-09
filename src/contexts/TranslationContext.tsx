import React, { createContext, useContext, useEffect, useState } from 'react';
import en from "/src/translations/en.json"
import fr from "/src/translations/fr.json"

type TranslationContextProps = {
    translation: typeof en | typeof fr;
    changeLanguage: (langu: "en" | "fr") => void 
    lang: "en" | "fr";
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

type TranslationProviderProps = {
    children: React.ReactNode
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
    
    const initLang = (): "en" | "fr" | undefined => {
        const storedLang = localStorage.getItem("currentLang")
        if (!storedLang) return undefined
        if (storedLang === "en") return "en"
        if (storedLang === "fr") return "fr"
        return undefined
    }
    const [lang, setLang]= useState<"en" | "fr">(initLang() || "en")

    const changeLanguage = (langu : "en" | "fr") => {
        setLang(langu)
        localStorage.setItem("currentLang", langu)
    }
    
    useEffect(() => {
        const browserLang = navigator.language
        if (browserLang == "fr-FR") {
            setLang("fr")
        }
    }, [])

    const translations = {
        en,
        fr
    }

    return (
        <TranslationContext.Provider value={{
            translation : translations[lang], 
            changeLanguage, 
            lang
        }}>
            {children}
        </TranslationContext.Provider>
    )
}

export const useTranslation = () : TranslationContextProps => {
    
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error("Translation context error")
    }

    return context
}