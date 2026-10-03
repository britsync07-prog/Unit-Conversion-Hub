import { CategoryId } from './categories';

export interface Unit {
  id: string;
  name: string;
  plural: string;
  symbol: string;
  categoryId: CategoryId;
  factor?: number; // Multiply by this to get base unit
  toBase?: (val: number) => number;
  fromBase?: (val: number) => number;
  system?: 'metric' | 'imperial' | 'us' | 'si' | 'other';
  popular?: boolean;
  aliases: string[];
}

export const units: Unit[] = [
  // 1. LENGTH (Base: meter)
  { id: 'millimeter', name: 'Millimeter', plural: 'Millimeters', symbol: 'mm', categoryId: 'length', factor: 0.001, system: 'metric', popular: true, aliases: ['mm', 'millimeter', 'millimeters'] },
  { id: 'centimeter', name: 'Centimeter', plural: 'Centimeters', symbol: 'cm', categoryId: 'length', factor: 0.01, system: 'metric', popular: true, aliases: ['cm', 'centimeter', 'centimeters'] },
  { id: 'meter', name: 'Meter', plural: 'Meters', symbol: 'm', categoryId: 'length', factor: 1, system: 'si', popular: true, aliases: ['m', 'meter', 'meters'] },
  { id: 'kilometer', name: 'Kilometer', plural: 'Kilometers', symbol: 'km', categoryId: 'length', factor: 1000, system: 'metric', popular: true, aliases: ['km', 'kilometer', 'kilometers'] },
  { id: 'inch', name: 'Inch', plural: 'Inches', symbol: 'in', categoryId: 'length', factor: 0.0254, system: 'imperial', popular: true, aliases: ['in', 'inch', 'inches', '"'] },
  { id: 'foot', name: 'Foot', plural: 'Feet', symbol: 'ft', categoryId: 'length', factor: 0.3048, system: 'imperial', popular: true, aliases: ['ft', 'foot', 'feet', "'"] },
  { id: 'yard', name: 'Yard', plural: 'Yards', symbol: 'yd', categoryId: 'length', factor: 0.9144, system: 'imperial', aliases: ['yd', 'yard', 'yards'] },
  { id: 'mile', name: 'Mile', plural: 'Miles', symbol: 'mi', categoryId: 'length', factor: 1609.344, system: 'imperial', popular: true, aliases: ['mi', 'mile', 'miles'] },
  { id: 'nautical_mile', name: 'Nautical Mile', plural: 'Nautical Miles', symbol: 'nmi', categoryId: 'length', factor: 1852, system: 'other', aliases: ['nmi', 'nautical mile', 'nautical miles'] },

  // 2. WEIGHT / MASS (Base: kilogram)
  { id: 'microgram', name: 'Microgram', plural: 'Micrograms', symbol: 'mcg', categoryId: 'weight', factor: 0.000000001, system: 'metric', aliases: ['mcg', 'microgram', 'micrograms'] },
  { id: 'milligram', name: 'Milligram', plural: 'Milligrams', symbol: 'mg', categoryId: 'weight', factor: 0.000001, system: 'metric', popular: true, aliases: ['mg', 'milligram', 'milligrams'] },
  { id: 'gram', name: 'Gram', plural: 'Grams', symbol: 'g', categoryId: 'weight', factor: 0.001, system: 'metric', popular: true, aliases: ['g', 'gram', 'grams'] },
  { id: 'kilogram', name: 'Kilogram', plural: 'Kilograms', symbol: 'kg', categoryId: 'weight', factor: 1, system: 'si', popular: true, aliases: ['kg', 'kilogram', 'kilograms'] },
  { id: 'metric_ton', name: 'Metric Ton', plural: 'Metric Tons', symbol: 't', categoryId: 'weight', factor: 1000, system: 'metric', aliases: ['t', 'ton', 'metric ton', 'metric tons'] },
  { id: 'ounce', name: 'Ounce', plural: 'Ounces', symbol: 'oz', categoryId: 'weight', factor: 0.028349523125, system: 'imperial', popular: true, aliases: ['oz', 'ounce', 'ounces'] },
  { id: 'pound', name: 'Pound', plural: 'Pounds', symbol: 'lb', categoryId: 'weight', factor: 0.45359237, system: 'imperial', popular: true, aliases: ['lb', 'lbs', 'pound', 'pounds'] },
  { id: 'stone', name: 'Stone', plural: 'Stones', symbol: 'st', categoryId: 'weight', factor: 6.35029318, system: 'imperial', popular: true, aliases: ['st', 'stone', 'stones'] },
  { id: 'ton', name: 'Short Ton (US)', plural: 'US Short Tons', symbol: 'ton', categoryId: 'weight', factor: 907.18474, system: 'us', aliases: ['ton', 'us ton', 'us tons', 'short ton'] },

  // 3. TEMPERATURE (Base: Celsius)
  { 
    id: 'celsius', name: 'Celsius', plural: 'Celsius', symbol: '°C', categoryId: 'temperature', system: 'metric', popular: true, aliases: ['c', 'celsius', '°c', 'degrees celsius'],
    toBase: (v) => v, fromBase: (v) => v
  },
  { 
    id: 'fahrenheit', name: 'Fahrenheit', plural: 'Fahrenheit', symbol: '°F', categoryId: 'temperature', system: 'us', popular: true, aliases: ['f', 'fahrenheit', '°f', 'degrees fahrenheit'],
    toBase: (v) => (v - 32) * 5/9, fromBase: (v) => (v * 9/5) + 32
  },
  { 
    id: 'kelvin', name: 'Kelvin', plural: 'Kelvin', symbol: 'K', categoryId: 'temperature', system: 'si', popular: true, aliases: ['k', 'kelvin'],
    toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15
  },

  // 4. AREA (Base: square_meter)
  { id: 'square_millimeter', name: 'Square Millimeter', plural: 'Square Millimeters', symbol: 'mm²', categoryId: 'area', factor: 0.000001, system: 'metric', aliases: ['mm2', 'sq mm'] },
  { id: 'square_centimeter', name: 'Square Centimeter', plural: 'Square Centimeters', symbol: 'cm²', categoryId: 'area', factor: 0.0001, system: 'metric', aliases: ['cm2', 'sq cm'] },
  { id: 'square_meter', name: 'Square Meter', plural: 'Square Meters', symbol: 'm²', categoryId: 'area', factor: 1, system: 'si', popular: true, aliases: ['m2', 'sq m', 'square meter'] },
  { id: 'square_kilometer', name: 'Square Kilometer', plural: 'Square Kilometers', symbol: 'km²', categoryId: 'area', factor: 1000000, system: 'metric', popular: true, aliases: ['km2', 'sq km'] },
  { id: 'square_inch', name: 'Square Inch', plural: 'Square Inches', symbol: 'in²', categoryId: 'area', factor: 0.00064516, system: 'imperial', aliases: ['in2', 'sq in', 'sq inch'] },
  { id: 'square_foot', name: 'Square Foot', plural: 'Square Feet', symbol: 'ft²', categoryId: 'area', factor: 0.09290304, system: 'imperial', popular: true, aliases: ['ft2', 'sq ft', 'square feet'] },
  { id: 'square_yard', name: 'Square Yard', plural: 'Square Yards', symbol: 'yd²', categoryId: 'area', factor: 0.83612736, system: 'imperial', aliases: ['yd2', 'sq yd'] },
  { id: 'acre', name: 'Acre', plural: 'Acres', symbol: 'ac', categoryId: 'area', factor: 4046.8564224, system: 'imperial', popular: true, aliases: ['ac', 'acre', 'acres'] },
  { id: 'hectare', name: 'Hectare', plural: 'Hectares', symbol: 'ha', categoryId: 'area', factor: 10000, system: 'metric', popular: true, aliases: ['ha', 'hectare', 'hectares'] },
  { id: 'square_mile', name: 'Square Mile', plural: 'Square Miles', symbol: 'mi²', categoryId: 'area', factor: 2589988.110336, system: 'imperial', popular: true, aliases: ['mi2', 'sq mi'] },

  // 5. VOLUME (Base: liter)
  { id: 'milliliter', name: 'Milliliter', plural: 'Milliliters', symbol: 'ml', categoryId: 'volume', factor: 0.001, system: 'metric', popular: true, aliases: ['ml', 'milliliter', 'cc'] },
  { id: 'liter', name: 'Liter', plural: 'Liters', symbol: 'L', categoryId: 'volume', factor: 1, system: 'si', popular: true, aliases: ['l', 'liter', 'liters'] },
  { id: 'cubic_meter', name: 'Cubic Meter', plural: 'Cubic Meters', symbol: 'm³', categoryId: 'volume', factor: 1000, system: 'si', popular: true, aliases: ['m3', 'cubic meter'] },
  { id: 'teaspoon', name: 'Teaspoon (US)', plural: 'Teaspoons', symbol: 'tsp', categoryId: 'volume', factor: 0.00492892159375, system: 'us', popular: true, aliases: ['tsp', 'teaspoon'] },
  { id: 'tablespoon', name: 'Tablespoon (US)', plural: 'Tablespoons', symbol: 'tbsp', categoryId: 'volume', factor: 0.01478676478125, system: 'us', popular: true, aliases: ['tbsp', 'tablespoon'] },
  { id: 'us_fluid_ounce', name: 'Fluid Ounce (US)', plural: 'Fluid Ounces', symbol: 'fl oz', categoryId: 'volume', factor: 0.0295735295625, system: 'us', popular: true, aliases: ['fl oz', 'fluid ounce'] },
  { id: 'cup', name: 'Cup (US)', plural: 'Cups', symbol: 'cup', categoryId: 'volume', factor: 0.2365882365, system: 'us', popular: true, aliases: ['cup', 'cups'] },
  { id: 'pint', name: 'Pint (US)', plural: 'Pints', symbol: 'pt', categoryId: 'volume', factor: 0.473176473, system: 'us', aliases: ['pt', 'pint'] },
  { id: 'quart', name: 'Quart (US)', plural: 'Quarts', symbol: 'qt', categoryId: 'volume', factor: 0.946352946, system: 'us', aliases: ['qt', 'quart'] },
  { id: 'gallon', name: 'Gallon (US)', plural: 'Gallons', symbol: 'gal', categoryId: 'volume', factor: 3.785411784, system: 'us', popular: true, aliases: ['gal', 'gallon', 'gallons'] },
  { id: 'cubic_inch', name: 'Cubic Inch', plural: 'Cubic Inches', symbol: 'cu in', categoryId: 'volume', factor: 0.016387064, system: 'imperial', aliases: ['in3', 'cu in', 'cubic inch'] },
  { id: 'cubic_foot', name: 'Cubic Foot', plural: 'Cubic Feet', symbol: 'cu ft', categoryId: 'volume', factor: 28.316846592, system: 'imperial', aliases: ['ft3', 'cu ft', 'cubic foot'] },
  { id: 'cubic_yard', name: 'Cubic Yard', plural: 'Cubic Yards', symbol: 'cu yd', categoryId: 'volume', factor: 764.554857984, system: 'imperial', aliases: ['yd3', 'cu yd', 'cubic yard'] },

  // 6. TIME (Base: second)
  { id: 'millisecond', name: 'Millisecond', plural: 'Milliseconds', symbol: 'ms', categoryId: 'time', factor: 0.001, system: 'si', aliases: ['ms', 'millisecond'] },
  { id: 'second', name: 'Second', plural: 'Seconds', symbol: 's', categoryId: 'time', factor: 1, system: 'si', popular: true, aliases: ['s', 'sec', 'second'] },
  { id: 'minute', name: 'Minute', plural: 'Minutes', symbol: 'min', categoryId: 'time', factor: 60, system: 'other', popular: true, aliases: ['min', 'minute', 'minutes'] },
  { id: 'hour', name: 'Hour', plural: 'Hours', symbol: 'h', categoryId: 'time', factor: 3600, system: 'other', popular: true, aliases: ['h', 'hr', 'hour', 'hours'] },
  { id: 'day', name: 'Day', plural: 'Days', symbol: 'd', categoryId: 'time', factor: 86400, system: 'other', popular: true, aliases: ['d', 'day', 'days'] },
  { id: 'week', name: 'Week', plural: 'Weeks', symbol: 'wk', categoryId: 'time', factor: 604800, system: 'other', popular: true, aliases: ['wk', 'week', 'weeks'] },
  { id: 'month', name: 'Month (Avg)', plural: 'Months', symbol: 'mo', categoryId: 'time', factor: 2629746, system: 'other', popular: true, aliases: ['mo', 'month', 'months'] },
  { id: 'year', name: 'Year (365 Days)', plural: 'Years', symbol: 'yr', categoryId: 'time', factor: 31536000, system: 'other', popular: true, aliases: ['yr', 'year', 'years'] },

  // 7. SPEED (Base: meters per second)
  { id: 'mps', name: 'Meters per second', plural: 'Meters per second', symbol: 'm/s', categoryId: 'speed', factor: 1, system: 'si', popular: true, aliases: ['m/s', 'mps'] },
  { id: 'kph', name: 'Kilometers per hour', plural: 'Kilometers per hour', symbol: 'km/h', categoryId: 'speed', factor: 0.27777777777778, system: 'metric', popular: true, aliases: ['km/h', 'kph', 'kmh'] },
  { id: 'mph', name: 'Miles per hour', plural: 'Miles per hour', symbol: 'mph', categoryId: 'speed', factor: 0.44704, system: 'imperial', popular: true, aliases: ['mph', 'mi/h'] },
  { id: 'fps', name: 'Feet per second', plural: 'Feet per second', symbol: 'ft/s', categoryId: 'speed', factor: 0.3048, system: 'imperial', aliases: ['ft/s', 'fps'] },
  { id: 'knot', name: 'Knot', plural: 'Knots', symbol: 'kn', categoryId: 'speed', factor: 0.51444444444444, system: 'other', popular: true, aliases: ['kn', 'knot', 'knots'] },

  // 8. PRESSURE (Base: pascal)
  { id: 'pascal', name: 'Pascal', plural: 'Pascals', symbol: 'Pa', categoryId: 'pressure', factor: 1, system: 'si', popular: true, aliases: ['pa', 'pascal'] },
  { id: 'kilopascal', name: 'Kilopascal', plural: 'Kilopascals', symbol: 'kPa', categoryId: 'pressure', factor: 1000, system: 'metric', popular: true, aliases: ['kpa', 'kilopascal'] },
  { id: 'bar', name: 'Bar', plural: 'Bars', symbol: 'bar', categoryId: 'pressure', factor: 100000, system: 'metric', popular: true, aliases: ['bar', 'bars'] },
  { id: 'psi', name: 'Pounds per square inch', plural: 'PSI', symbol: 'psi', categoryId: 'pressure', factor: 6894.757293168, system: 'imperial', popular: true, aliases: ['psi', 'lb/in2'] },
  { id: 'atmosphere', name: 'Standard Atmosphere', plural: 'Atmospheres', symbol: 'atm', categoryId: 'pressure', factor: 101325, system: 'other', popular: true, aliases: ['atm', 'atmosphere'] },
  { id: 'torr', name: 'Torr', plural: 'Torrs', symbol: 'Torr', categoryId: 'pressure', factor: 133.322368421, system: 'other', aliases: ['torr'] },
  { id: 'mmhg', name: 'Millimeter of Mercury', plural: 'mmHg', symbol: 'mmHg', categoryId: 'pressure', factor: 133.322387415, system: 'other', aliases: ['mmhg', 'mm hg'] },

  // 9. ENERGY (Base: joule)
  { id: 'joule', name: 'Joule', plural: 'Joules', symbol: 'J', categoryId: 'energy', factor: 1, system: 'si', popular: true, aliases: ['j', 'joule'] },
  { id: 'kilojoule', name: 'Kilojoule', plural: 'Kilojoules', symbol: 'kJ', categoryId: 'energy', factor: 1000, system: 'metric', popular: true, aliases: ['kj', 'kilojoule'] },
  { id: 'calorie', name: 'Gram Calorie', plural: 'Calories', symbol: 'cal', categoryId: 'energy', factor: 4.184, system: 'other', aliases: ['cal', 'calorie'] },
  { id: 'kilocalorie', name: 'Kilocalorie (Food Cal)', plural: 'Kilocalories', symbol: 'kcal', categoryId: 'energy', factor: 4184, system: 'other', popular: true, aliases: ['kcal', 'kilocalorie', 'Cal'] },
  { id: 'watt_hour', name: 'Watt-hour', plural: 'Watt-hours', symbol: 'Wh', categoryId: 'energy', factor: 3600, system: 'metric', aliases: ['wh', 'watt-hour'] },
  { id: 'kilowatt_hour', name: 'Kilowatt-hour', plural: 'Kilowatt-hours', symbol: 'kWh', categoryId: 'energy', factor: 3600000, system: 'metric', popular: true, aliases: ['kwh', 'kilowatt-hour'] },
  { id: 'btu', name: 'British Thermal Unit', plural: 'BTUs', symbol: 'BTU', categoryId: 'energy', factor: 1055.05585262, system: 'imperial', popular: true, aliases: ['btu', 'btus'] },
  { id: 'foot_pound', name: 'Foot-pound', plural: 'Foot-pounds', symbol: 'ft⋅lb', categoryId: 'energy', factor: 1.3558179483314, system: 'imperial', aliases: ['ft-lb', 'foot-pound'] },

  // 10. POWER (Base: watt)
  { id: 'watt', name: 'Watt', plural: 'Watts', symbol: 'W', categoryId: 'power', factor: 1, system: 'si', popular: true, aliases: ['w', 'watt'] },
  { id: 'kilowatt', name: 'Kilowatt', plural: 'Kilowatts', symbol: 'kW', categoryId: 'power', factor: 1000, system: 'metric', popular: true, aliases: ['kw', 'kilowatt'] },
  { id: 'megawatt', name: 'Megawatt', plural: 'Megawatts', symbol: 'MW', categoryId: 'power', factor: 1000000, system: 'metric', aliases: ['mw', 'megawatt'] },
  { id: 'horsepower', name: 'Horsepower (Mechanical/US)', plural: 'Horsepower', symbol: 'hp', categoryId: 'power', factor: 745.699872, system: 'us', popular: true, aliases: ['hp', 'horsepower'] },

  // 11. FORCE (Base: newton)
  { id: 'newton', name: 'Newton', plural: 'Newtons', symbol: 'N', categoryId: 'force', factor: 1, system: 'si', popular: true, aliases: ['n', 'newton'] },
  { id: 'kilonewton', name: 'Kilonewton', plural: 'Kilonewtons', symbol: 'kN', categoryId: 'force', factor: 1000, system: 'metric', popular: true, aliases: ['kn', 'kilonewton'] },
  { id: 'pound_force', name: 'Pound-force', plural: 'Pound-forces', symbol: 'lbf', categoryId: 'force', factor: 4.4482216152605, system: 'imperial', popular: true, aliases: ['lbf', 'pound-force', 'lb-force'] },
  { id: 'kilogram_force', name: 'Kilogram-force', plural: 'Kilogram-forces', symbol: 'kgf', categoryId: 'force', factor: 9.80665, system: 'metric', aliases: ['kgf', 'kilogram-force'] },

  // 12. DIGITAL DATA (Base: byte)
  { id: 'bit', name: 'Bit', plural: 'Bits', symbol: 'b', categoryId: 'data', factor: 0.125, system: 'si', popular: true, aliases: ['bit', 'bits'] },
  { id: 'byte', name: 'Byte', plural: 'Bytes', symbol: 'B', categoryId: 'data', factor: 1, system: 'si', popular: true, aliases: ['byte', 'bytes'] },
  { id: 'kilobyte', name: 'Kilobyte', plural: 'Kilobytes', symbol: 'KB', categoryId: 'data', factor: 1024, system: 'si', popular: true, aliases: ['kb', 'kilobyte'] },
  { id: 'megabyte', name: 'Megabyte', plural: 'Megabytes', symbol: 'MB', categoryId: 'data', factor: 1048576, system: 'si', popular: true, aliases: ['mb', 'megabyte'] },
  { id: 'gigabyte', name: 'Gigabyte', plural: 'Gigabytes', symbol: 'GB', categoryId: 'data', factor: 1073741824, system: 'si', popular: true, aliases: ['gb', 'gigabyte'] },
  { id: 'terabyte', name: 'Terabyte', plural: 'Terabytes', symbol: 'TB', categoryId: 'data', factor: 1099511627776, system: 'si', popular: true, aliases: ['tb', 'terabyte'] },

  // 13. ANGLE (Base: degree)
  { id: 'degree', name: 'Degree', plural: 'Degrees', symbol: '°', categoryId: 'angle', factor: 1, system: 'other', popular: true, aliases: ['deg', 'degree', 'degrees', '°'] },
  { id: 'radian', name: 'Radian', plural: 'Radians', symbol: 'rad', categoryId: 'angle', factor: 180 / Math.PI, system: 'si', popular: true, aliases: ['rad', 'radian', 'radians'] },
  { id: 'gradian', name: 'Gradian', plural: 'Gradians', symbol: 'grad', categoryId: 'angle', factor: 0.9, system: 'other', aliases: ['grad', 'gradian'] },
  { id: 'arcminute', name: 'Arcminute', plural: 'Arcminutes', symbol: 'arcmin', categoryId: 'angle', factor: 1 / 60, system: 'other', aliases: ['arcmin', 'arcminute', "'"] },
  { id: 'arcsecond', name: 'Arcsecond', plural: 'Arcseconds', symbol: 'arcsec', categoryId: 'angle', factor: 1 / 3600, system: 'other', aliases: ['arcsec', 'arcsecond', '"'] },

  // 14. FUEL ECONOMY (Base: US MPG)
  { 
    id: 'mpg_us', name: 'Miles per gallon (US)', plural: 'MPG (US)', symbol: 'mpg (US)', categoryId: 'fuel_economy', system: 'us', popular: true, aliases: ['mpg', 'mpg us'],
    toBase: (v) => v, fromBase: (v) => v
  },
  { 
    id: 'mpg_imp', name: 'Miles per gallon (Imperial/UK)', plural: 'MPG (Imp)', symbol: 'mpg (UK)', categoryId: 'fuel_economy', system: 'imperial', popular: true, aliases: ['mpg uk', 'mpg imp'],
    toBase: (v) => v / 1.20095, fromBase: (v) => v * 1.20095
  },
  { 
    id: 'km_per_liter', name: 'Kilometers per liter', plural: 'km/L', symbol: 'km/L', categoryId: 'fuel_economy', system: 'metric', popular: true, aliases: ['km/l', 'kml'],
    toBase: (v) => v * 2.35214583, fromBase: (v) => v / 2.35214583
  },
  { 
    id: 'liters_per_100km', name: 'Liters per 100 km', plural: 'L/100km', symbol: 'L/100km', categoryId: 'fuel_economy', system: 'metric', popular: true, aliases: ['l/100km', 'l100km'],
    toBase: (v) => (v === 0 ? 0 : 235.214583 / v), fromBase: (v) => (v === 0 ? 0 : 235.214583 / v)
  },
];
