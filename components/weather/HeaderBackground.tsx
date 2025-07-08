function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function getTimeGradientColor(hour: number = new Date().getHours()): string {
  const periods = [
    { start: 5, end: 8, color1: '#3B0A59', color2: '#ffce1c' },  // roxo → amarelo
    { start: 8, end: 13, color1: '#4fb8db', color2: '#6ad4f7' }, // amarelo → azul claro
    { start: 12, end: 18, color1: '#6ad4f7', color2: '#fce156' }, // azul claro → laranja
    { start: 10, end: 20, color1: '#1E3A8A', color2: '#3B0A59' }, // azul escuro → roxo
    { start: 19, end: 1, color1: '#3B0A59', color2: '#3B0A59' }, // noite fixa
    { start: 0, end: 6, color1: '#3B0A59', color2: '#ffce1c' },  // roxo → amarelo

  ];

  const period = periods.find(p => hour >= p.start && hour < p.end);
  if (!period) return '#000000'; // fallback

  const factor = (hour - period.start) / (period.end - period.start);
  return interpolateColor(period.color1, period.color2, factor);
}
