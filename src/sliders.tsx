import { FaLock, FaLockOpen } from "react-icons/fa";


const InputSlider = ({props, handler1}) => {

  const handleChange = (e) => {
    if (!props.locked) {
      const value = {id:props.id, value: e.target.value} 
      handler1(value)
    } // on a tous pt ici
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      <label htmlFor={`slider-${props.name}`} className='text-purple-600 exo-2-normal self-start'>
        {props.name}: 
        <input 
          type="number" 
          name="numberslider"
          value={props.slider}
          onChange={handleChange}
          min="0" 
          max="100"
          className='ml-1 appearance-none border-none rounded-lg px-1 w-[38px] bg-purple-200 focus:ring-0'
        />
      </label>
      <div className="flex items-center gap-2">
        <input
          name={`slider-${props.name}`}
          type="range"
          min="0"
          max="100"
          value={props.slider}
          onChange={handleChange}
          className="w-64 h-3 bg-purple-300 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #7E22CE ${props.slider}%, #D8B4FE ${props.slider}%)`,
          }}
        />
        <div className="cursor-pointer text-purple-800">
          {props.locked ? (
            <FaLock size={20} onClick={() => props.setLocked(false)} />
          ) : (
            <FaLockOpen size={20} onClick={() => props.setLocked(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputSlider