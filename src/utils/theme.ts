import { PrimaryColor } from '../types/invoice';

export const PRIMARY_COLOR_OPTIONS: { id: PrimaryColor; label: string }[] = [
  { id: 'blue', label: 'Blue' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'purple', label: 'Purple' },
  { id: 'amber', label: 'Amber' },
  { id: 'rose', label: 'Rose' },
];

export function primaryButtonClasses(color: PrimaryColor): string {
  switch (color) {
    case 'emerald':
      return 'bg-emerald-600 hover:bg-emerald-700';
    case 'purple':
      return 'bg-purple-600 hover:bg-purple-700';
    case 'amber':
      return 'bg-amber-500 hover:bg-amber-600';
    case 'rose':
      return 'bg-rose-600 hover:bg-rose-700';
    case 'blue':
    default:
      return 'bg-blue-600 hover:bg-blue-700';
  }
}

export function primaryAccentTextClasses(color: PrimaryColor): string {
  switch (color) {
    case 'emerald':
      return 'text-emerald-600';
    case 'purple':
      return 'text-purple-600';
    case 'amber':
      return 'text-amber-500';
    case 'rose':
      return 'text-rose-600';
    case 'blue':
    default:
      return 'text-blue-600';
  }
}

export function primaryRangeAccentClasses(color: PrimaryColor): string {
  switch (color) {
    case 'emerald':
      return 'accent-emerald-600';
    case 'purple':
      return 'accent-purple-600';
    case 'amber':
      return 'accent-amber-500';
    case 'rose':
      return 'accent-rose-600';
    case 'blue':
    default:
      return 'accent-blue-600';
  }
}


