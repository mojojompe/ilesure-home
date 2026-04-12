import { useEffect, useState } from 'react';

export function AnimatedGradientMesh() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #C9962A 0%, transparent 70%)',
          left: '10%',
          top: '10%',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #5C3317 0%, transparent 70%)',
          right: '10%',
          bottom: '20%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[80px] transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, #F5E6C8 0%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #C9962A 0%, #5C3317 100%, transparent 70%)',
          left: '30%',
          bottom: '10%',
        }}
      />
    </div>
  );
}
