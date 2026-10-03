export interface ConversionPair {
  slug: string;
  fromId: string;
  toId: string;
  categoryId: string;
  popular?: boolean;
}

export const conversionPairs: ConversionPair[] = [
  // 1. LENGTH
  { slug: 'cm-to-inches', fromId: 'centimeter', toId: 'inch', categoryId: 'length', popular: true },
  { slug: 'inches-to-cm', fromId: 'inch', toId: 'centimeter', categoryId: 'length', popular: true },
  { slug: 'mm-to-inches', fromId: 'millimeter', toId: 'inch', categoryId: 'length', popular: true },
  { slug: 'inches-to-mm', fromId: 'inch', toId: 'millimeter', categoryId: 'length', popular: true },
  { slug: 'meters-to-feet', fromId: 'meter', toId: 'foot', categoryId: 'length', popular: true },
  { slug: 'feet-to-meters', fromId: 'foot', toId: 'meter', categoryId: 'length', popular: true },
  { slug: 'km-to-miles', fromId: 'kilometer', toId: 'mile', categoryId: 'length', popular: true },
  { slug: 'miles-to-km', fromId: 'mile', toId: 'kilometer', categoryId: 'length', popular: true },
  { slug: 'feet-to-inches', fromId: 'foot', toId: 'inch', categoryId: 'length' },
  { slug: 'inches-to-feet', fromId: 'inch', toId: 'foot', categoryId: 'length' },
  { slug: 'yards-to-meters', fromId: 'yard', toId: 'meter', categoryId: 'length' },
  { slug: 'meters-to-yards', fromId: 'meter', toId: 'yard', categoryId: 'length' },
  { slug: 'meters-to-cm', fromId: 'meter', toId: 'centimeter', categoryId: 'length' },
  { slug: 'cm-to-meters', fromId: 'centimeter', toId: 'meter', categoryId: 'length' },
  { slug: 'mm-to-cm', fromId: 'millimeter', toId: 'centimeter', categoryId: 'length' },
  { slug: 'cm-to-mm', fromId: 'centimeter', toId: 'millimeter', categoryId: 'length' },
  { slug: 'feet-to-yards', fromId: 'foot', toId: 'yard', categoryId: 'length' },
  { slug: 'yards-to-feet', fromId: 'yard', toId: 'foot', categoryId: 'length' },
  { slug: 'miles-to-feet', fromId: 'mile', toId: 'foot', categoryId: 'length' },
  { slug: 'feet-to-miles', fromId: 'foot', toId: 'mile', categoryId: 'length' },
  { slug: 'nautical-miles-to-km', fromId: 'nautical_mile', toId: 'kilometer', categoryId: 'length' },
  { slug: 'km-to-nautical-miles', fromId: 'kilometer', toId: 'nautical_mile', categoryId: 'length' },

  // 2. WEIGHT & MASS
  { slug: 'kg-to-lbs', fromId: 'kilogram', toId: 'pound', categoryId: 'weight', popular: true },
  { slug: 'lbs-to-kg', fromId: 'pound', toId: 'kilogram', categoryId: 'weight', popular: true },
  { slug: 'grams-to-ounces', fromId: 'gram', toId: 'ounce', categoryId: 'weight', popular: true },
  { slug: 'ounces-to-grams', fromId: 'ounce', toId: 'gram', categoryId: 'weight', popular: true },
  { slug: 'lbs-to-ounces', fromId: 'pound', toId: 'ounce', categoryId: 'weight', popular: true },
  { slug: 'ounces-to-lbs', fromId: 'ounce', toId: 'pound', categoryId: 'weight' },
  { slug: 'grams-to-kg', fromId: 'gram', toId: 'kilogram', categoryId: 'weight' },
  { slug: 'kg-to-grams', fromId: 'kilogram', toId: 'gram', categoryId: 'weight' },
  { slug: 'mg-to-grams', fromId: 'milligram', toId: 'gram', categoryId: 'weight' },
  { slug: 'grams-to-mg', fromId: 'gram', toId: 'milligram', categoryId: 'weight' },
  { slug: 'lbs-to-stones', fromId: 'pound', toId: 'stone', categoryId: 'weight' },
  { slug: 'stones-to-lbs', fromId: 'stone', toId: 'pound', categoryId: 'weight' },
  { slug: 'kg-to-stones', fromId: 'kilogram', toId: 'stone', categoryId: 'weight' },
  { slug: 'stones-to-kg', fromId: 'stone', toId: 'kilogram', categoryId: 'weight' },
  { slug: 'metric-tons-to-kg', fromId: 'metric_ton', toId: 'kilogram', categoryId: 'weight' },
  { slug: 'kg-to-metric-tons', fromId: 'kilogram', toId: 'metric_ton', categoryId: 'weight' },
  { slug: 'us-tons-to-lbs', fromId: 'ton', toId: 'pound', categoryId: 'weight' },
  { slug: 'lbs-to-us-tons', fromId: 'pound', toId: 'ton', categoryId: 'weight' },

  // 3. TEMPERATURE
  { slug: 'celsius-to-fahrenheit', fromId: 'celsius', toId: 'fahrenheit', categoryId: 'temperature', popular: true },
  { slug: 'fahrenheit-to-celsius', fromId: 'fahrenheit', toId: 'celsius', categoryId: 'temperature', popular: true },
  { slug: 'celsius-to-kelvin', fromId: 'celsius', toId: 'kelvin', categoryId: 'temperature', popular: true },
  { slug: 'kelvin-to-celsius', fromId: 'kelvin', toId: 'celsius', categoryId: 'temperature' },
  { slug: 'fahrenheit-to-kelvin', fromId: 'fahrenheit', toId: 'kelvin', categoryId: 'temperature' },
  { slug: 'kelvin-to-fahrenheit', fromId: 'kelvin', toId: 'fahrenheit', categoryId: 'temperature' },

  // 4. AREA
  { slug: 'square-feet-to-square-meters', fromId: 'square_foot', toId: 'square_meter', categoryId: 'area', popular: true },
  { slug: 'square-meters-to-square-feet', fromId: 'square_meter', toId: 'square_foot', categoryId: 'area', popular: true },
  { slug: 'acres-to-square-feet', fromId: 'acre', toId: 'square_foot', categoryId: 'area', popular: true },
  { slug: 'square-feet-to-acres', fromId: 'square_foot', toId: 'acre', categoryId: 'area' },
  { slug: 'hectares-to-acres', fromId: 'hectare', toId: 'acre', categoryId: 'area', popular: true },
  { slug: 'acres-to-hectares', fromId: 'acre', toId: 'hectare', categoryId: 'area' },
  { slug: 'sq-km-to-sq-miles', fromId: 'square_kilometer', toId: 'square_mile', categoryId: 'area' },
  { slug: 'sq-miles-to-sq-km', fromId: 'square_mile', toId: 'square_kilometer', categoryId: 'area' },
  { slug: 'sq-meters-to-hectares', fromId: 'square_meter', toId: 'hectare', categoryId: 'area' },
  { slug: 'hectares-to-sq-meters', fromId: 'hectare', toId: 'square_meter', categoryId: 'area' },

  // 5. VOLUME
  { slug: 'liters-to-gallons', fromId: 'liter', toId: 'gallon', categoryId: 'volume', popular: true },
  { slug: 'gallons-to-liters', fromId: 'gallon', toId: 'liter', categoryId: 'volume', popular: true },
  { slug: 'cups-to-ml', fromId: 'cup', toId: 'milliliter', categoryId: 'volume', popular: true },
  { slug: 'ml-to-cups', fromId: 'milliliter', toId: 'cup', categoryId: 'volume' },
  { slug: 'fluid-ounces-to-ml', fromId: 'us_fluid_ounce', toId: 'milliliter', categoryId: 'volume', popular: true },
  { slug: 'ml-to-fluid-ounces', fromId: 'milliliter', toId: 'us_fluid_ounce', categoryId: 'volume' },
  { slug: 'liters-to-ml', fromId: 'liter', toId: 'milliliter', categoryId: 'volume' },
  { slug: 'ml-to-liters', fromId: 'milliliter', toId: 'liter', categoryId: 'volume' },
  { slug: 'quarts-to-liters', fromId: 'quart', toId: 'liter', categoryId: 'volume' },
  { slug: 'liters-to-quarts', fromId: 'liter', toId: 'quart', categoryId: 'volume' },
  { slug: 'pints-to-ml', fromId: 'pint', toId: 'milliliter', categoryId: 'volume' },
  { slug: 'tablespoons-to-teaspoons', fromId: 'tablespoon', toId: 'teaspoon', categoryId: 'volume' },
  { slug: 'teaspoons-to-tablespoons', fromId: 'teaspoon', toId: 'tablespoon', categoryId: 'volume' },
  { slug: 'cubic-feet-to-cubic-meters', fromId: 'cubic_foot', toId: 'cubic_meter', categoryId: 'volume' },
  { slug: 'cubic-meters-to-cubic-feet', fromId: 'cubic_meter', toId: 'cubic_foot', categoryId: 'volume' },

  // 6. TIME
  { slug: 'seconds-to-minutes', fromId: 'second', toId: 'minute', categoryId: 'time', popular: true },
  { slug: 'minutes-to-seconds', fromId: 'minute', toId: 'second', categoryId: 'time' },
  { slug: 'minutes-to-hours', fromId: 'minute', toId: 'hour', categoryId: 'time', popular: true },
  { slug: 'hours-to-minutes', fromId: 'hour', toId: 'minute', categoryId: 'time' },
  { slug: 'hours-to-days', fromId: 'hour', toId: 'day', categoryId: 'time', popular: true },
  { slug: 'days-to-hours', fromId: 'day', toId: 'hour', categoryId: 'time' },
  { slug: 'days-to-weeks', fromId: 'day', toId: 'week', categoryId: 'time' },
  { slug: 'weeks-to-days', fromId: 'week', toId: 'day', categoryId: 'time' },
  { slug: 'days-to-years', fromId: 'day', toId: 'year', categoryId: 'time' },
  { slug: 'years-to-days', fromId: 'year', toId: 'day', categoryId: 'time' },
  { slug: 'milliseconds-to-seconds', fromId: 'millisecond', toId: 'second', categoryId: 'time' },

  // 7. SPEED
  { slug: 'mph-to-kph', fromId: 'mph', toId: 'kph', categoryId: 'speed', popular: true },
  { slug: 'kph-to-mph', fromId: 'kph', toId: 'mph', categoryId: 'speed', popular: true },
  { slug: 'mps-to-kph', fromId: 'mps', toId: 'kph', categoryId: 'speed', popular: true },
  { slug: 'kph-to-mps', fromId: 'kph', toId: 'mps', categoryId: 'speed' },
  { slug: 'knots-to-mph', fromId: 'knot', toId: 'mph', categoryId: 'speed' },
  { slug: 'mph-to-knots', fromId: 'mph', toId: 'knot', categoryId: 'speed' },
  { slug: 'feet-per-sec-to-mph', fromId: 'fps', toId: 'mph', categoryId: 'speed' },

  // 8. PRESSURE
  { slug: 'psi-to-bar', fromId: 'psi', toId: 'bar', categoryId: 'pressure', popular: true },
  { slug: 'bar-to-psi', fromId: 'bar', toId: 'psi', categoryId: 'pressure', popular: true },
  { slug: 'psi-to-kpa', fromId: 'psi', toId: 'kilopascal', categoryId: 'pressure', popular: true },
  { slug: 'kpa-to-psi', fromId: 'kilopascal', toId: 'psi', categoryId: 'pressure' },
  { slug: 'atmospheres-to-psi', fromId: 'atmosphere', toId: 'psi', categoryId: 'pressure' },
  { slug: 'psi-to-atmospheres', fromId: 'psi', toId: 'atmosphere', categoryId: 'pressure' },
  { slug: 'bar-to-atmospheres', fromId: 'bar', toId: 'atmosphere', categoryId: 'pressure' },

  // 9. ENERGY
  { slug: 'joules-to-calories', fromId: 'joule', toId: 'calorie', categoryId: 'energy' },
  { slug: 'calories-to-joules', fromId: 'calorie', toId: 'joule', categoryId: 'energy' },
  { slug: 'kwh-to-joules', fromId: 'kilowatt_hour', toId: 'joule', categoryId: 'energy', popular: true },
  { slug: 'joules-to-kwh', fromId: 'joule', toId: 'kilowatt_hour', categoryId: 'energy' },
  { slug: 'btu-to-joules', fromId: 'btu', toId: 'joule', categoryId: 'energy' },
  { slug: 'kwh-to-btu', fromId: 'kilowatt_hour', toId: 'btu', categoryId: 'energy' },

  // 10. POWER
  { slug: 'kilowatt-to-horsepower', fromId: 'kilowatt', toId: 'horsepower', categoryId: 'power', popular: true },
  { slug: 'horsepower-to-kilowatt', fromId: 'horsepower', toId: 'kilowatt', categoryId: 'power', popular: true },
  { slug: 'watts-to-horsepower', fromId: 'watt', toId: 'horsepower', categoryId: 'power' },
  { slug: 'horsepower-to-watts', fromId: 'horsepower', toId: 'watt', categoryId: 'power' },
  { slug: 'watts-to-kilowatts', fromId: 'watt', toId: 'kilowatt', categoryId: 'power' },
  { slug: 'kilowatts-to-watts', fromId: 'kilowatt', toId: 'watt', categoryId: 'power' },

  // 11. FORCE
  { slug: 'newtons-to-pound-force', fromId: 'newton', toId: 'pound_force', categoryId: 'force', popular: true },
  { slug: 'pound-force-to-newtons', fromId: 'pound_force', toId: 'newton', categoryId: 'force', popular: true },
  { slug: 'kilonewtons-to-newtons', fromId: 'kilonewton', toId: 'newton', categoryId: 'force' },
  { slug: 'kgf-to-newtons', fromId: 'kilogram_force', toId: 'newton', categoryId: 'force' },

  // 12. DIGITAL DATA
  { slug: 'megabytes-to-gigabytes', fromId: 'megabyte', toId: 'gigabyte', categoryId: 'data', popular: true },
  { slug: 'gigabytes-to-megabytes', fromId: 'gigabyte', toId: 'megabyte', categoryId: 'data', popular: true },
  { slug: 'gigabytes-to-terabytes', fromId: 'gigabyte', toId: 'terabyte', categoryId: 'data', popular: true },
  { slug: 'terabytes-to-gigabytes', fromId: 'terabyte', toId: 'gigabyte', categoryId: 'data' },
  { slug: 'kilobytes-to-megabytes', fromId: 'kilobyte', toId: 'megabyte', categoryId: 'data' },
  { slug: 'megabytes-to-kilobytes', fromId: 'megabyte', toId: 'kilobyte', categoryId: 'data' },
  { slug: 'bytes-to-kilobytes', fromId: 'byte', toId: 'kilobyte', categoryId: 'data' },
  { slug: 'bits-to-bytes', fromId: 'bit', toId: 'byte', categoryId: 'data' },
  { slug: 'bytes-to-bits', fromId: 'byte', toId: 'bit', categoryId: 'data' },

  // 13. ANGLE
  { slug: 'degrees-to-radians', fromId: 'degree', toId: 'radian', categoryId: 'angle', popular: true },
  { slug: 'radians-to-degrees', fromId: 'radian', toId: 'degree', categoryId: 'angle', popular: true },
  { slug: 'degrees-to-gradians', fromId: 'degree', toId: 'gradian', categoryId: 'angle' },
  { slug: 'arcminutes-to-degrees', fromId: 'arcminute', toId: 'degree', categoryId: 'angle' },

  // 14. FUEL ECONOMY
  { slug: 'mpg-us-to-liters-per-100km', fromId: 'mpg_us', toId: 'liters_per_100km', categoryId: 'fuel_economy', popular: true },
  { slug: 'liters-per-100km-to-mpg-us', fromId: 'liters_per_100km', toId: 'mpg_us', categoryId: 'fuel_economy', popular: true },
  { slug: 'mpg-us-to-mpg-uk', fromId: 'mpg_us', toId: 'mpg_imp', categoryId: 'fuel_economy' },
  { slug: 'km-per-liter-to-mpg-us', fromId: 'km_per_liter', toId: 'mpg_us', categoryId: 'fuel_economy' },
];
