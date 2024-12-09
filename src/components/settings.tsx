import React, { useEffect } from "react";
import { StateContextType, useStateContext } from "../context";
import { IoMdClose } from "react-icons/io";

export type SettingsProps = {
    buttonRef: React.MutableRefObject<null>;
    panelRef: React.MutableRefObject<null>;
};

const Settings: React.FC<SettingsProps> = ({ buttonRef, panelRef }) => {
    const { isSettingsOpen, toggleSettings, currentTheme, themes, toggleTheme }: StateContextType = useStateContext();


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
        <div className={`bg-[var(--background-settings)]  fixed min-w-[300px] top-0 left-full h-full transition-transform duration-300 ease-in-out z-[60] ${isSettingsOpen ? 'w-1/6 -translate-x-full' : 'w-1/6 translate-x-0'
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
            <h1 className="flex justify-center exo-2-bold text-2xl text-[var(--text-primaryColor)] bg-gradient-to-r from-[var(--background-fadeComp10)] to-[var(--background-fadeComp11)] mx-auto w-fit px-4 py-0.5 rounded-2xl my-6">Themes</h1>
            <div className="m-4 grid grid-cols-2 gap-4">
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option1'
                        name='option'
                        value="classicRose"
                    />
                    <label className="exo-2-normal" htmlFor="option1">Rose</label>
                </div>
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option2'
                        name='option'
                        value="leef"
                    />
                    <label className="exo-2-normal" htmlFor="option2">Leef</label>
                </div>
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option3'
                        name='option'
                        value="classicDarkRose"
                    />
                    <label className="exo-2-normal" htmlFor="option3">Dark Rose</label>
                </div>
                <div className="w-auto h-5">
                    <input
                        type="radio"
                        id='option4'
                        name='option'
                        value="DarkLeef"
                    />
                    <label className="exo-2-normal" htmlFor="option4">Dark Leef</label>
                </div>
            </div>
            <div
                className={`${currentTheme} min-h-screen flex flex-col items-center justify-center`}
                style={{
                    backgroundColor: 'var(--background-color)',
                    color: 'var(--text-color)',
                }}
            >
                <h1 className="text-customColor-default text-4xl">Hello, Tailwind!</h1>
                <p className="mt-4">Choose a theme:</p>
                <div className="flex mt-4 gap-4">
                    {themes.map((theme) => (
                        <label key={theme.id} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="theme"
                                value={theme.id}
                                checked={currentTheme === theme.id}
                                onChange={() => toggleTheme(theme.id)}
                                className="accent-customColor-default"
                            />
                            {theme.label}
                        </label>
                    ))}
                </div>
                <div className="mt-6">
                    <p>The current theme is:</p>
                    <strong>{currentTheme.replace('theme-', '')}</strong>
                </div>
            </div>
        </div>
    )
}

export default Settings