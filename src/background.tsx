import { useRef } from 'react';

const AnimatedShapes = () => {
  const shapes = useRef<Array<{ 
    left: string; 
    top: string; 
    width: string; 
    height: string; 
    opacity: number; 
    animationDelay: string; 
    animationDuration: string;
    className: string;
    rotateDirection: string;
    translateDirection: string;
    rotateAmount: number;
  }>>([]);

  if (shapes.current.length === 0) {
    shapes.current = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 140 + 100}%`,
      width: `${Math.random() * 130 + 70}px`,
      height: `${Math.random() * 130 + 70}px`,
      opacity: 0.3,
      animationDelay: `${Math.random() * 5 + 1}s`,
      animationDuration: `${Math.random() * 15 + 15}s`,
      className: `absolute ${
        Math.random() > 0.5 ? 'rounded-full' : ''
      } ${
        Math.random() > 0.5 
          ? Math.random() > 0.5 ? 'border-8 border-purple-200' : 'border-8 border-purple-400' 
          : Math.random() > 0.5 ? 'bg-purple-200 rounded-md' : 'bg-purple-400 rounded-md'
      }`,
      rotateDirection: Math.random() > 0.5 ? '' : '-',
      translateDirection: Math.random() > 0.5 ? '' : '-',
      rotateAmount: Math.random() * 720,
    }));
  }

  return (
    <div className="top-0 left-0 right-0 bottom-0 fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0">
        {shapes.current.map((shape, i) => (
          <div
            key={i}
            className={shape.className}
            style={{
              left: shape.left,
              top: shape.top,
              width: shape.width,
              height: shape.height,
              opacity: shape.opacity,
              animation: `float ${shape.animationDuration} linear infinite`,
              animationDelay: shape.animationDelay,
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
            transform: translate(${shapes.current[0].translateDirection}5vw, -240vh) rotate(${shapes.current[0].rotateAmount}deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedShapes;
