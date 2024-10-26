import React, { useEffect } from 'react'
import InputSlider from './sliders'
import { StateContextType, useStateContext } from './context';
import { ParamProps } from './App';

export type SidebarProps = {
  buttonRef: React.MutableRefObject<null>;
  panelRef: React.MutableRefObject<null>;
  params: ParamProps[];
};

const Sidebar: React.FC<SidebarProps> = ({buttonRef, panelRef, params}) => {
    const { isOpen, setIsOpen, setChangeIndex }: StateContextType = useStateContext();

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          panelRef.current &&
          !panelRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }
    
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    return (
    <div 
        className={`bg-purple-100 fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'w-1/5 translate-x-0' : 'w-1/5 -translate-x-full'
        } overflow-y-auto`}
        ref={panelRef}
    >
        <div className="p-6 space-y-6">
            <h2 className="text-2xl exo-2-bold text-purple-600 mb-4 w-[48px]">Poids</h2>
            {params.map((param: ParamProps, index: number) => (
                <div key={index} className="space-y-2">
                    <InputSlider props={param} handler1={setChangeIndex}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar
