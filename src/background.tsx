const AnimatedShapes = () => {
    return (
      <div className="top-0 left-0 right-0 bottom-0 fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${
              Math.random() > 0.5 ? 'rounded-full' : ''
              } ${
              Math.random() > 0.5 
              ? Math.random() > 0.5 ? 'border-8 border-purple-200' : 'border-8 border-purple-400' 
              : Math.random() > 0.5 ? 'bg-purple-200 rounded-md' : 'bg-purple-400 rounded-md' }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 140 + 100}%`,
                width: `${Math.random() * 130 + 70}px`,
                height: `${Math.random() * 130 + 70}px`,
                opacity: 0.3,
                animation: `float ${Math.random() * 15 + 15}s linear infinite`,
                animationDelay : `${Math.random() * 5 + 1}s`
              }}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes float {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            100% {
              transform: translate(
              ${Math.random() > 0.5 ? '' : '-'}5vw, -240vh) rotate(
              ${Math.random() * 720}deg);
            }
          }
        `}</style>
      </div>
    )
}

export default AnimatedShapes