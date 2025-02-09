import React, { useEffect } from "react";
import { StateContextType, useStateContext } from "../context";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "../contexts/TranslationContext";

export type SettingsProps = {
    buttonRef: React.MutableRefObject<HTMLButtonElement | null>;
    panelRef: React.MutableRefObject<HTMLDivElement | null>;
};

const Settings: React.FC<SettingsProps> = ({ buttonRef, panelRef }) => {
    const { isSettingsOpen, toggleSettings, currentTheme, toggleTheme }: StateContextType = useStateContext();
    const { translation, lang, changeLanguage } = useTranslation()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isSettingsOpen &&
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                toggleSettings()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSettingsOpen])

    return (
        <div className={`bg-[var(--background-settings)] fixed min-w-[375px] top-0 left-full h-full transition-transform duration-300 ease-in-out z-[60] ${isSettingsOpen ? 'w-1/6 -translate-x-full' : 'w-1/6 translate-x-0'
            } overflow-y-hidden`} ref={panelRef}>
            <div className='top-0 flex sticky bg-gradient-to-r from-[var(--background-fadeComp10)] to-[var(--background-fadeComp11)] shadow-lg h-24 w-full'>
                <h2 className="text-5xl h-24 exo-2-bold justify-center flex items-center m-auto text-[var(--text-primaryColor)]">Options</h2>
                <button
                    className="p-2 hover:bg-[var(--button-headerRight-colorHover)] group flex justify-end bg-[var(--button-headerRight-color)] rounded-2xl ml-12 m-auto lg:ml-0 hover:outline-[var(--button-headerRight-inlineColorHover)] hover:outline-2 outline-[var(--button-headerRight-inlineColorHover)] shadow-lg hover:outline hover:scale-105 transition-all hover:-rotate-2 hover:shadow-xl"
                    onClick={toggleSettings}
                >
                    <IoMdClose size={30} className="group-hover:-rotate-90 transition-all group-hover:text-[var(--button-headerRight-inlineColorHover)] text-[var(--button-headerRight-inlineColor)] duration-300" />
                </button>
            </div>
            <h1 className="flex justify-center exo-2-bold text-2xl text-[var(--text-primaryColor)] bg-gradient-to-r from-[var(--background-fadeComp10)] to-[var(--background-fadeComp11)] mx-auto w-fit px-4 py-0.5 rounded-2xl my-6">{translation.homePage.sidebar.options[0]}</h1>
            <div className="m-4 grid grid-cols-2 gap-4">
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option1'
                        name='option'
                        value="theme-rose"
                        checked={currentTheme === "theme-rose"}
                        onChange={() => toggleTheme("theme-rose")}
                    />
                    <label className="exo-2-normal" htmlFor="option1">{translation.homePage.sidebar.options[1]}</label>
                </div>
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option2'
                        name='option'
                        value="theme-darkRose"
                        checked={currentTheme === "theme-darkRose"}
                        onChange={() => toggleTheme("theme-darkRose")}
                    />
                    <label className="exo-2-normal" htmlFor="option2">{translation.homePage.sidebar.options[2]}</label>
                </div>
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option3'
                        name='option'
                        value="theme-apple"
                        checked={currentTheme === "theme-apple"}
                        onChange={() => toggleTheme("theme-apple")}
                    />
                    <label className="exo-2-normal" htmlFor="option3">{translation.homePage.sidebar.options[3]}</label>
                </div>
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option4'
                        name='option'
                        value="theme-darkApple"
                        checked={currentTheme === "theme-darkApple"}
                        onChange={() => toggleTheme("theme-darkApple")}
                    />
                    <label className="exo-2-normal truncate" htmlFor="option4">{translation.homePage.sidebar.options[4]}</label>
                </div>
            </div>
            <h1 className="flex mt-12 justify-center exo-2-bold text-2xl text-[var(--text-primaryColor)] bg-gradient-to-r from-[var(--background-fadeComp10)] to-[var(--background-fadeComp11)] mx-auto w-fit px-4 py-0.5 rounded-2xl my-6">{translation.homePage.sidebar.options[5]}</h1>
            <div className="m-4 grid grid-cols-2 gap-4">
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='Lang1'
                        name='Lang'
                        value="en"
                        checked={lang === "en"}
                        onChange={() => changeLanguage("en")}
                    />
                    <label className="exo-2-normal" htmlFor="Lang1">English</label>
                </div>
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='Lang2'
                        name='Lang'
                        value="fr"
                        checked={lang === "fr"}
                        onChange={() => changeLanguage("fr")}
                    />
                    <label className="exo-2-normal" htmlFor="Lang2">Francais</label>
                </div>
            </div>
        </div>
    )
}

export default Settings