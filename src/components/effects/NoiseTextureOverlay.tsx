import { useEffect, useState } from 'react';

export function NoiseTextureOverlay() {
  const [noise, setNoise] = useState('');

  useEffect(() => {
    const generateNoise = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.createImageData(200, 200);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 255;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 15;
      }
      ctx.putImageData(imageData, 0, 0);
      setNoise(canvas.toDataURL());
    };

    generateNoise();
  }, []);

  if (!noise) return null;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url(${noise})`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
