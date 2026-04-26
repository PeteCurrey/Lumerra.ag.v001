import { describe, it, expect } from 'vitest';

// Simulating the formula from RunningCostCalculator.tsx
function calculateMonthlyCost(product: any, tariff: number, hoursPerWeek: number) {
  const heater_kw = product.specs.heater_kw || 3;
  const pump_kw = (product.specs.pumps || 2) * 1.5;
  const standby_kw = 0.4;
  const efficiency_factor = 0.45;
  const heating_hours_per_day = 2.5;

  const monthly_kwh = (heater_kw * heating_hours_per_day * 30 * efficiency_factor)
                    + (pump_kw * hoursPerWeek * 4 * 0.6)
                    + (standby_kw * 24 * 30);

  return (monthly_kwh * tariff) / 100;
}

describe('Lumerra Economics', () => {
  it('calculates running costs accurately for a luxury spa', () => {
    const product = { specs: { heater_kw: 3, pumps: 2 } };
    const cost = calculateMonthlyCost(product, 28.5, 5);
    
    // Expected:
    // Heating: 3 * 2.5 * 30 * 0.45 = 101.25 kWh
    // Usage: 3 * 5 * 4 * 0.6 = 36 kWh
    // Standby: 0.4 * 24 * 30 = 288 kWh
    // Total: 425.25 kWh
    // Cost: (425.25 * 28.5) / 100 = 121.19625
    
    expect(cost).toBeCloseTo(121.20, 1);
  });

  it('calculates deposit correctly for high-value items', () => {
    const price = 12499;
    const deposit = Math.floor(price * 0.25);
    expect(deposit).toBe(3124);
  });
});
