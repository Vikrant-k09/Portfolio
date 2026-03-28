import { useEffect, useRef } from 'react';

function n(x, s) {
  return (
    Math.sin(x * 1.3 + s) * Math.cos(x * 0.85 + s * 0.65) +
    Math.sin(x * 2.9 + s * 1.1) * 0.45 +
    Math.sin(x * 0.55 + s) * 0.75
  );
}

function drawContourLoop(ctx, centerX, centerY, radiusX, radiusY, seed, phase) {
  const steps = 150;

  ctx.beginPath();

  for (let index = 0; index <= steps; index += 1) {
    const angle = (index / steps) * Math.PI * 2;
    const wobble =
      1 +
      Math.sin(angle * 3 + seed + phase * 0.28) * 0.045 +
      Math.cos(angle * 5 - seed * 1.2 + phase * 0.22) * 0.032 +
      Math.sin(angle * 8 + seed * 0.65) * 0.018;

    const offsetX = Math.sin(angle * 2 + seed) * radiusX * 0.035;
    const offsetY = Math.cos(angle * 3 + seed * 1.1) * radiusY * 0.03;
    const x = centerX + Math.cos(angle) * radiusX * wobble + offsetX;
    const y = centerY + Math.sin(angle) * radiusY * wobble + offsetY;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
}

function drawGrid(ctx, width, height) {
  const columns = 8;
  const rows = 11;

  ctx.save();
  ctx.strokeStyle = 'rgba(111, 144, 161, 0.12)';
  ctx.lineWidth = 1;

  for (let index = 1; index < columns; index += 1) {
    const x = (width / columns) * index;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let index = 1; index < rows; index += 1) {
    const y = (height / rows) * index;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(86, 116, 132, 0.45)';
  ctx.font = '500 10px "DM Sans", sans-serif';
  ctx.textTransform = 'uppercase';

  const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  colLabels.forEach((label, index) => {
    ctx.fillText(label, 12 + (width / columns) * index, 16);
  });

  for (let index = 0; index < rows; index += 1) {
    ctx.fillText(String(index + 1).padStart(2, '0'), width - 28, 24 + (height / rows) * index);
  }

  ctx.restore();
}

function drawContours(ctx, width, height, time) {
  const groups = [
    {
      centerX: width * 0.34 + Math.sin(time * 0.45) * 4,
      centerY: height * 0.38 + Math.cos(time * 0.38) * 3,
      radiusX: width * 0.17,
      radiusY: height * 0.14,
      levels: 9,
      seed: 0.8,
      color: 'rgba(108, 139, 152, 0.46)'
    },
    {
      centerX: width * 0.62 + Math.cos(time * 0.33) * 5,
      centerY: height * 0.3 + Math.sin(time * 0.28) * 4,
      radiusX: width * 0.21,
      radiusY: height * 0.18,
      levels: 10,
      seed: 2.2,
      color: 'rgba(89, 118, 132, 0.44)'
    },
    {
      centerX: width * 0.56 + Math.sin(time * 0.27) * 3,
      centerY: height * 0.68 + Math.cos(time * 0.31) * 2,
      radiusX: width * 0.28,
      radiusY: height * 0.18,
      levels: 8,
      seed: 3.9,
      color: 'rgba(125, 150, 158, 0.36)'
    }
  ];

  groups.forEach((group, groupIndex) => {
    for (let level = 0; level < group.levels; level += 1) {
      const shrink = 1 - level * 0.084;
      const alpha = 0.16 + (group.levels - level) * 0.026;

      ctx.save();
      ctx.strokeStyle = group.color.replace(/[\d.]+\)$/u, `${alpha})`);
      ctx.lineWidth = level === 0 ? 1.3 : 1;
      drawContourLoop(
        ctx,
        group.centerX,
        group.centerY,
        group.radiusX * shrink,
        group.radiusY * shrink,
        group.seed + level * 0.23 + groupIndex * 0.12,
        time
      );
      ctx.stroke();
      ctx.restore();
    }
  });
}

function drawRoute(ctx, width, height, time) {
  const route = [
    [0.16, 0.74],
    [0.26, 0.66],
    [0.38, 0.61],
    [0.5, 0.56],
    [0.61, 0.49],
    [0.72, 0.43],
    [0.82, 0.36]
  ];

  ctx.save();
  ctx.lineWidth = 1.8;
  ctx.setLineDash([7, 8]);
  ctx.lineDashOffset = -time * 16;
  ctx.strokeStyle = 'rgba(91, 154, 181, 0.7)';
  ctx.beginPath();

  route.forEach(([xRatio, yRatio], index) => {
    const x = width * xRatio;
    const y = height * yRatio + Math.sin(time * 0.22 + index * 0.6) * 1.8;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
  ctx.setLineDash([]);

  route.forEach(([xRatio, yRatio], index) => {
    const x = width * xRatio;
    const y = height * yRatio + Math.sin(time * 0.22 + index * 0.6) * 1.8;

    ctx.beginPath();
    ctx.fillStyle = index === route.length - 1 ? 'rgba(91, 154, 181, 0.95)' : 'rgba(91, 154, 181, 0.42)';
    ctx.arc(x, y, index === route.length - 1 ? 4.1 : 2.6, 0, Math.PI * 2);
    ctx.fill();
  });

  const markerX = width * route[route.length - 1][0];
  const markerY = height * route[route.length - 1][1] + Math.sin(time * 0.22 + route.length * 0.6) * 1.8;
  const pulse = 10 + Math.sin(time * 1.3) * 1.8;

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(91, 154, 181, 0.28)';
  ctx.lineWidth = 1;
  ctx.arc(markerX, markerY, pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(70, 94, 108, 0.82)';
  ctx.font = '600 10px "DM Sans", sans-serif';
  ctx.fillText('DHARAMSHALA', markerX - 34, markerY - 14);

  ctx.fillStyle = 'rgba(115, 139, 152, 0.75)';
  ctx.font = '500 9px "DM Sans", sans-serif';
  ctx.fillText('ridge route study', markerX - 34, markerY - 2);
  ctx.restore();
}

function drawMatrixField(ctx, width, height, time) {
  const rows = 15;
  const columns = 10;

  ctx.save();

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = width * 0.07 + (width * 0.86 * column) / (columns - 1);
      const y = height * 0.12 + (height * 0.72 * row) / (rows - 1);
      const value =
        Math.abs(n(column * 0.24 + row * 0.16, time * 0.18 + 1.4)) * 0.55 +
        Math.abs(n(row * 0.2 + column * 0.12, time * 0.12 + 2.7)) * 0.45;
      const radius = 0.9 + value * 1.8;

      ctx.beginPath();
      ctx.fillStyle = `rgba(91, 154, 181, ${0.08 + value * 0.15})`;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

export default function MountainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !parent || !ctx) {
      return undefined;
    }

    let frameId = 0;
    let time = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const baseGradient = ctx.createLinearGradient(0, 0, 0, height);
      baseGradient.addColorStop(0, '#DDE8F0');
      baseGradient.addColorStop(0.48, '#EAF0F4');
      baseGradient.addColorStop(1, '#EEF3F6');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      const haze = ctx.createRadialGradient(width * 0.28, height * 0.16, 0, width * 0.28, height * 0.16, width * 0.52);
      haze.addColorStop(0, 'rgba(255,255,255,0.5)');
      haze.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      const sideGlow = ctx.createRadialGradient(width * 0.88, height * 0.74, 0, width * 0.88, height * 0.74, width * 0.44);
      sideGlow.addColorStop(0, 'rgba(173,201,217,0.22)');
      sideGlow.addColorStop(1, 'rgba(173,201,217,0)');
      ctx.fillStyle = sideGlow;
      ctx.fillRect(0, 0, width, height);

      drawGrid(ctx, width, height);
      drawMatrixField(ctx, width, height, time);
      drawContours(ctx, width, height, time);
      drawRoute(ctx, width, height, time);

      ctx.fillStyle = 'rgba(69, 96, 109, 0.6)';
      ctx.font = '500 10px "DM Sans", sans-serif';
      ctx.fillText('DHAULADHAR CONTOUR MATRIX', 18, height - 22);

      ctx.fillStyle = 'rgba(125, 149, 162, 0.62)';
      ctx.font = '500 9px "DM Sans", sans-serif';
      ctx.fillText('terrain memory / district study', 18, height - 10);

      const vignette = ctx.createLinearGradient(0, height * 0.72, 0, height);
      vignette.addColorStop(0, 'rgba(238,243,246,0)');
      vignette.addColorStop(1, 'rgba(214,224,230,0.58)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, height * 0.72, width, height * 0.28);

      time += 0.012;
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
