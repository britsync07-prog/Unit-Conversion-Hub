
export type CategoryId = 
  | 'length' 
  | 'weight' 
  | 'temperature' 
  | 'area' 
  | 'volume' 
  | 'time' 
  | 'speed' 
  | 'pressure' 
  | 'energy' 
  | 'power' 
  | 'force' 
  | 'data' 
  | 'angle' 
  | 'fuel_economy';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  baseUnitId: string;
}

export const categories: Category[] = [
  {
    id: 'length',
    name: 'Length',
    slug: 'length-converter',
    description: 'Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.',
    baseUnitId: 'meter'
  },
  {
    id: 'weight',
    name: 'Weight & Mass',
    slug: 'weight-converter',
    description: 'Convert between milligrams, grams, kilograms, ounces, pounds, and stones.',
    baseUnitId: 'kilogram'
  },
  {
    id: 'temperature',
    name: 'Temperature',
    slug: 'temperature-converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    baseUnitId: 'celsius' // Special handling
  },
  {
    id: 'area',
    name: 'Area',
    slug: 'area-converter',
    description: 'Convert between square meters, square feet, acres, and hectares.',
    baseUnitId: 'square_meter'
  },
  {
    id: 'volume',
    name: 'Volume',
    slug: 'volume-converter',
    description: 'Convert between liters, milliliters, gallons, quarts, pints, and cups.',
    baseUnitId: 'liter'
  },
  {
    id: 'time',
    name: 'Time',
    slug: 'time-converter',
    description: 'Convert between seconds, minutes, hours, days, weeks, months, and years.',
    baseUnitId: 'second'
  },
  {
    id: 'speed',
    name: 'Speed',
    slug: 'speed-converter',
    description: 'Convert between meters per second, kilometers per hour, and miles per hour.',
    baseUnitId: 'mps'
  },
  {
    id: 'pressure',
    name: 'Pressure',
    slug: 'pressure-converter',
    description: 'Convert between pascals, bars, psi, and atmospheres.',
    baseUnitId: 'pascal'
  },
  {
    id: 'energy',
    name: 'Energy',
    slug: 'energy-converter',
    description: 'Convert between joules, calories, and kilowatt-hours.',
    baseUnitId: 'joule'
  },
  {
    id: 'power',
    name: 'Power',
    slug: 'power-converter',
    description: 'Convert between watts, kilowatts, and horsepower.',
    baseUnitId: 'watt'
  },
  {
    id: 'force',
    name: 'Force',
    slug: 'force-converter',
    description: 'Convert between newtons and pound-force.',
    baseUnitId: 'newton'
  },
  {
    id: 'data',
    name: 'Digital Data',
    slug: 'data-converter',
    description: 'Convert between bits, bytes, kilobytes, megabytes, gigabytes, and terabytes.',
    baseUnitId: 'byte'
  },
  {
    id: 'angle',
    name: 'Angle',
    slug: 'angle-converter',
    description: 'Convert between degrees and radians.',
    baseUnitId: 'degree'
  },
  {
    id: 'fuel_economy',
    name: 'Fuel Economy',
    slug: 'fuel-economy-converter',
    description: 'Convert between miles per gallon and liters per 100 km.',
    baseUnitId: 'mpg_us'
  }
];
