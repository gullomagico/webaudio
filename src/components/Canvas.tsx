import React, { useRef, useEffect } from 'react';
import type { IAnalyserNode, IAudioContext } from 'standardized-audio-context';

interface CanvasProps {
  analyser: IAnalyserNode<IAudioContext>;
  type: 'time' | 'frequency';
}

const Canvas: React.FC<CanvasProps> = ({ analyser, type }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);

  let bufferLength: number;
  let dataArray: Float32Array;
  let dataArrayAlt: Uint8Array;

  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;

  if (type === 'time') {
    bufferLength = analyser.fftSize;
    dataArray = new Float32Array(bufferLength);
  } else if (type === 'frequency') {
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArrayAlt = new Uint8Array(bufferLength);
  }

  const renderFrame = () => {
    if (canvasRef.current == null) return;
    const ctx = canvasRef.current.getContext('2d')!;

    const size = {
      width: canvasRef.current.width,
      height: canvasRef.current.height,
    };

    if (type === 'time') {
      analyser.getFloatTimeDomainData(dataArray);

      ctx.fillStyle = 'rgb(17, 24, 39)';

      ctx.fillRect(0, 0, size.width, size.height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgb(134, 239, 172)';
      ctx.beginPath();

      let sliceWidth = (size.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] * 50.0;
        let y = size.height / 2 + v;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(size.width, size.height / 2);
      ctx.stroke();
    }
    if (type === 'frequency') {
      analyser.getByteFrequencyData(dataArrayAlt);

      ctx.fillStyle = 'rgb(20, 50, 200)';
      ctx.fillRect(0, 0, size.width, size.height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.beginPath();

      let barWidth = size.width / bufferLength;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArrayAlt[i];

        ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        ctx.fillRect(x, size.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth;
      }
    }
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current!);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      className="h-[inherit] w-full rounded-lg border-2 border-green-600"
    />
  );
};

export default Canvas;
