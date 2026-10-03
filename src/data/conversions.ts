export interface ConversionPair {
  slug: string;
  fromId: string;
  toId: string;
  categoryId: string;
  popular?: boolean;
}

export const conversionPairs: ConversionPair[] = [
  // LENGTH
  { slug: 'cm-to-inches', fromId: 'centimeter', toId: 'inch', categoryId: 'length', popular: true },
  { slug: 'inches-to-cm', fromId: 'inch', toId: 'centimeter', categoryId: 'length', popular: true },
  { slug: 'mm-to-inches', fromId: 'millimeter', toId: 'inch', categoryId: 'length', popular: true },
  { slug: 'inches-to-mm', fromId: 'inch', toId: 'millimeter', categoryId: 'length' },
  { slug: 'meters-to-feet', fromId: 'meter', toId: 'foot', categoryId: 'length', popular: true },
  { slug: 'feet-to-meters', fromId: 'foot', toId: 'meter', categoryId: 'length', popular: true },
  { slug: 'km-to-miles', fromId: 'kilometer', toId: 'mile', categoryId: 'length', popular: true },
  { slug: 'miles-to-km', fromId: 'mile', toId: 'kilometer', categoryId: 'length', popular: true },
  { slug: 'feet-to-inches', fromId: 'foot', toId: 'inch', categoryId: 'length' },
  { slug: 'inches-to-feet', fromId: 'inch', toId: 'foot', categoryId: 'length' },
  { slug: 'yards-to-meters', fromId: 'yard', toId: 'meter', categoryId: 'length' },
  
  // WEIGHT
  { slug: 'kg-to-lbs', fromId: 'kilogram', toId: 'pound', categoryId: 'weight', popular: true },
  { slug: 'lbs-to-kg', fromId: 'pound', toId: 'kilogram', categoryId: 'weight', popular: true },
  { slug: 'grams-to-ounces', fromId: 'gram', toId: 'ounce', categoryId: 'weight', popular: true },
  { slug: 'ounces-to-grams', fromId: 'ounce', toId: 'gram', categoryId: 'weight' },
  { slug: 'lbs-to-stones', fromId: 'pound', toId: 'stone', categoryId: 'weight' },
  { slug: 'stones-to-lbs', fromId: 'stone', toId: 'pound', categoryId: 'weight' },
  { slug: 'kg-to-stones', fromId: 'kilogram', toId: 'stone', categoryId: 'weight' },
  { slug: 'stones-to-kg', fromId: 'stone', toId: 'kilogram', categoryId: 'weight' },
  
  // TEMPERATURE
  { slug: 'celsius-to-fahrenheit', fromId: 'celsius', toId: 'fahrenheit', categoryId: 'temperature', popular: true },
  { slug: 'fahrenheit-to-celsius', fromId: 'fahrenheit', toId: 'celsius', categoryId: 'temperature', popular: true },
  { slug: 'celsius-to-kelvin', fromId: 'celsius', toId: 'kelvin', categoryId: 'temperature' },
  { slug: 'fahrenheit-to-kelvin', fromId: 'fahrenheit', toId: 'kelvin', categoryId: 'temperature' },
  
  // AREA
  { slug: 'square-feet-to-square-meters', fromId: 'square_foot', toId: 'square_meter', categoryId: 'area', popular: true },
  { slug: 'square-meters-to-square-feet', fromId: 'square_meter', toId: 'square_foot', categoryId: 'area', popular: true },
  { slug: 'acres-to-square-feet', fromId: 'acre', toId: 'square_foot', categoryId: 'area' },
  { slug: 'hectares-to-acres', fromId: 'hectare', toId: 'acre', categoryId: 'area' },
  
  // VOLUME
  { slug: 'liters-to-gallons', fromId: 'liter', toId: 'gallon', categoryId: 'volume', popular: true },
  { slug: 'gallons-to-liters', fromId: 'gallon', toId: 'liter', categoryId: 'volume', popular: true },
  { slug: 'cups-to-ml', fromId: 'cup', toId: 'milliliter', categoryId: 'volume' },
  { slug: 'fluid-ounces-to-ml', fromId: 'us_fluid_ounce', toId: 'milliliter', categoryId: 'volume' },
  
  // SPEED
  { slug: 'mph-to-kph', fromId: 'mph', toId: 'kph', categoryId: 'speed', popular: true },
  { slug: 'kph-to-mph', fromId: 'kph', toId: 'mph', categoryId: 'speed', popular: true },
  
  // TIME
  { slug: 'seconds-to-minutes', fromId: 'second', toId: 'minute', categoryId: 'time' },
  { slug: 'minutes-to-hours', fromId: 'minute', toId: 'hour', categoryId: 'time' },
  { slug: 'hours-to-days', fromId: 'hour', toId: 'day', categoryId: 'time' },

  // PRESSURE & POWER
  { slug: 'psi-to-bar', fromId: 'psi', toId: 'bar', categoryId: 'pressure' },
  { slug: 'bar-to-psi', fromId: 'bar', toId: 'psi', categoryId: 'pressure' },
  { slug: 'kilowatt-to-horsepower', fromId: 'kilowatt', toId: 'horsepower', categoryId: 'power' },
  { slug: 'horsepower-to-kilowatt', fromId: 'horsepower', toId: 'kilowatt', categoryId: 'power' },

  // DATA
  { slug: 'megabytes-to-gigabytes', fromId: 'megabyte', toId: 'gigabyte', categoryId: 'data' },
  { slug: 'gigabytes-to-terabytes', fromId: 'gigabyte', toId: 'terabyte', categoryId: 'data' },
];
