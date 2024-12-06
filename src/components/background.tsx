import { useRef } from 'react';

const AnimatedShapes = () => {
  const fgShapes = useRef<Array<{
    left: string;
    top: string;
    width: number;
    height: number;
    opacity: number;
    animationDelay: string;
    animationDuration: string;
    rotateStart: string;
    className: string;
    translateDirection: string,
    rotateAmount: number;
  }>>([]);

  const bgShapes = useRef<Array<{
    left: string;
    top: string;
    width: number;
    height: number;
    opacity: number;
    animationDelay: string;
    animationDuration: string;
    rotateStart: string;
    className: string;
    translateDirection: string,
    rotateAmount: number;
  }>>([]);

  if (fgShapes.current.length === 0) {
    fgShapes.current = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 140 + 110}%`,
      width: Math.random() * 90 + 110,
      height: Math.random() * 90 + 110,
      opacity: 0.4,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 15 + 20}s`,
      rotateStart: `${Math.random() * 360 + 360}`,
      className: `absolute ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-lg'
        } ${Math.random() > 0.5
          ? Math.random() > 0.5 ? 'border-8 border-pink-200' : 'border-8 border-purple-400'
          : Math.random() > 0.5 ? 'bg-purple-200' : 'bg-pink-400'
        }`,
      translateDirection: Math.random() > 0.5 ? '' : '-',
      rotateAmount: Math.random() * 720 + 360,
    }));
  }
  if (bgShapes.current.length === 0) {
    bgShapes.current = [...Array(20)].map(() => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 140 + 130}%`,
      width: Math.random() * 30 + 50,
      height: Math.random() * 30 + 50,
      opacity: 0.2,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 15 + 60}s`,
      rotateStart: `${Math.random() * 360 + 360}`,
      className: `absolute ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-md'
        } ${Math.random() > 0.5
          ? Math.random() > 0.5 ? 'border-4 border-pink-200' : 'border-4 border-purple-400'
          : Math.random() > 0.5 ? 'bg-purple-200' : 'bg-pink-400'
        }`,
      translateDirection: Math.random() > 0.5 ? '' : '-',
      rotateAmount: Math.random() * 720 + 360,
    }));
  }

  return (
    <div className="top-0 left-0 right-0 bottom-0 fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0">
        {fgShapes.current.map((shape, i) => (
          <div
            key={i}
            className={shape.className}
            style={{
              left: shape.left,
              top: shape.top,
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              opacity: shape.opacity,
              animation: `float ${shape.animationDuration} linear infinite`,
              animationDelay: shape.animationDelay,
            }}
          />
        ))}
        {bgShapes.current.map((shape, i) => (
          <div
            key={i}
            className={shape.className}
            style={{
              left: shape.left,
              top: shape.top,
              width: `${shape.width}px`,
              height: `${shape.height}px`,
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
            transform: translate(${bgShapes.current[0].translateDirection}5vw, -240vh) rotate(${bgShapes.current[0].rotateAmount}deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedShapes;