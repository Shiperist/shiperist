export type ButtonVariant = 'outline' | 'ghost' | 'solid';
export type Color =
  | 'rosewater'
  | 'lavender'
  | 'yellow'
  | 'red'
  | 'green'
  | 'blue'
  | 'pink'
  | 'teal';

const backgroundColors = [
  'bg-cat-rosewater',
  'bg-cat-lavender',
  'bg-cat-yellow',
  'bg-cat-red',
  'bg-cat-green',
  'bg-cat-blue',
  'bg-cat-pink',
  'bg-cat-teal'
];

const textColors = [
  'text-cat-rosewater',
  'text-cat-lavender',
  'text-cat-yellow',
  'text-cat-red',
  'text-cat-green',
  'text-cat-blue',
  'text-cat-pink',
  'text-cat-teal'
];

const borderColors = [
  'border-cat-rosewater',
  'border-cat-lavender',
  'border-cat-yellow',
  'border-cat-red',
  'border-cat-green',
  'border-cat-blue',
  'border-cat-pink',
  'border-cat-teal'
];

const hoverBackgroundColors = [
  'hover:bg-cat-rosewater',
  'hover:bg-cat-lavender',
  'hover:bg-cat-yellow',
  'hover:bg-cat-red',
  'hover:bg-cat-green',
  'hover:bg-cat-blue',
  'hover:bg-cat-pink',
  'hover:bg-cat-teal'
];

const hoverTextColors = [
  'hover:text-cat-rosewater',
  'hover:text-cat-lavender',
  'hover:text-cat-yellow',
  'hover:text-cat-red',
  'hover:text-cat-green',
  'hover:text-cat-blue',
  'hover:text-cat-pink',
  'hover:text-cat-teal'
];

const hoverBorderColors = [
  'hover:border-cat-rosewater',
  'hover:border-cat-lavender',
  'hover:border-cat-yellow',
  'hover:border-cat-red',
  'hover:border-cat-green',
  'hover:border-cat-blue',
  'hover:border-cat-pink',
  'hover:border-cat-teal'
];

export function getBackgroundColor(color: Color) {
  const index = backgroundColors.indexOf(`bg-cat-${color}`);
  if (index === -1) {
    return 'bg-cat-rosewater';
  }

  return backgroundColors[index] ?? 'bg-cat-rosewater';
}

export function getTextColor(color: Color) {
  const index = textColors.indexOf(`text-cat-${color}`);
  if (index === -1) {
    return 'text-cat-rosewater';
  }

  return textColors[index] ?? 'text-cat-rosewater';
}

export function getBorderColor(color: Color) {
  const index = borderColors.indexOf(`border-cat-${color}`);
  if (index === -1) {
    return 'border-cat-rosewater';
  }

  return borderColors[index] ?? 'border-cat-rosewater';
}

export function getHoverBackgroundColor(color: Color) {
  const index = hoverBackgroundColors.indexOf(`hover:bg-cat-${color}`);
  if (index === -1) {
    return 'hover:bg-cat-rosewater';
  }

  return hoverBackgroundColors[index] ?? 'hover:bg-cat-rosewater';
}

export function getHoverTextColor(color: Color) {
  const index = hoverTextColors.indexOf(`hover:text-cat-${color}`);
  if (index === -1) {
    return 'hover:text-cat-rosewater';
  }

  return hoverTextColors[index] ?? 'hover:text-cat-rosewater';
}

export function getHoverBorderColor(color: Color) {
  const index = hoverBorderColors.indexOf(`hover:border-cat-${color}`);
  if (index === -1) {
    return 'hover:border-cat-rosewater';
  }

  return hoverBorderColors[index] ?? 'hover:border-cat-rosewater';
}
