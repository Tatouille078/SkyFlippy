import React, { createContext, useContext, useEffect, useState } from 'react';
import en from "/src/translations/en.json"
import fr from "/src/translations/fr.json"

type TranslationContextProps = {
    translation: typeof en | typeof fr;
    setLang: React.Dispatch<React.SetStateAction<"en" | "fr">>
    lang: "en" | "fr";
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

type TranslationProviderProps = {
    children: React.ReactNode
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
    
    const [lang, setLang]= useState<"en" | "fr">("en")
    
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
            setLang, 
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