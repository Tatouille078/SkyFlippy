const InputSlider = ({ props, handler1 }) => {

  const handleChange = (e) => {
    if (!/^\d+$/.test(e.target.value) || e.target.value < 0 || e.target.value > 100) {
      return 
    } 
    props.setSlider(e.target.value)
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
      </div>
    </div>
  );
};

export default InputSlider