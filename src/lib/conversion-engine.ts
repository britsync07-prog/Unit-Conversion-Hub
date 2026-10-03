import { units, Unit } from '../data/units';

export function convert(value: number, fromId: string, toId: string): number {
  if (fromId === toId) return value;

  const fromUnit = units.find((u) => u.id === fromId);
  const toUnit = units.find((u) => u.id === toId);

  if (!fromUnit || !toUnit) return 0;
  if (fromUnit.categoryId !== toUnit.categoryId) return 0;

  // Handle custom transformation functions (e.g. Temperature, Inverse Fuel Economy)
  if (fromUnit.toBase || toUnit.fromBase) {
    const toBaseFn = fromUnit.toBase ?? ((v: number) => v * (fromUnit.factor ?? 1));
    const fromBaseFn = toUnit.fromBase ?? ((v: number) => v / (toUnit.factor ?? 1));
    const baseValue = toBaseFn(value);
    return fromBaseFn(baseValue);
  }

  // Standard multiplicative factor handling
  if (fromUnit.factor !== undefined && toUnit.factor !== undefined) {
    const baseValue = value * fromUnit.factor;
    return baseValue / toUnit.factor;
  }

  return value;
}

export function formatValue(val: number, precision: number | 'auto' = 'auto'): string {
  if (isNaN(val)) return '0';
  if (!isFinite(val)) return val > 0 ? 'Infinity' : '-Infinity';

  if (precision === 'auto') {
    if (val === 0) return '0';

    const absVal = Math.abs(val);
    // Exponential notation for extreme numbers
    if (absVal < 0.000001 || absVal >= 10000000000) {
      return val.toExponential(4);
    }

    // Default clean output without floating point noise (e.g. 0.30000000000000004 -> 0.3)
    const fixed = val.toFixed(8);
    const trimmed = parseFloat(fixed).toString();
    return trimmed;
  }

  return val.toFixed(precision);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}

export function getUnitsByCategory(categoryId: string): Unit[] {
  return units.filter((u) => u.categoryId === categoryId);
}
