import React, { useMemo, useState } from 'react';
import { calculateTax } from '../engine/taxCalculator';

export default function CrossoverChart({ currentInputs }) {
  const [hoverData, setHoverData] = useState(null);

  const { dataPoints, crossoverIncome, maxTax } = useMemo(() => {
    const points = [];
    let intersection = null;
    let maxT = 0;

    // We test from 5 Lakhs to 30 Lakhs in increments of 50k
    // Or if the user's income is higher, we test up to their income + 10L
    const userGross = currentInputs.grossAnnualIncome || 1000000;
    const maxGross = Math.max(3000000, userGross + 500000);
    const minGross = 500000;
    const step = 50000;

    for (let gross = minGross; gross <= maxGross; gross += step) {
      // Create a dummy input object overriding ONLY the basic salary so that gross income matches 'gross'
      // To do this simply, we override all salary components to 0 and set fdInterestAnnual to the target gross
      // But wait! Deductions like HRA, PF, Standard Deduction depend on basicSalary or gross!
      // So the most accurate way is to keep the user's ratio of basic/gross, or just increase basicSalary.
      // Let's just override basicSalary to equal the target gross, and zero out other incomes for the simulation.
      const simInputs = {
        ...currentInputs,
        basicSalary: gross / 12,
        hraReceived: 0,
        specialAllowance: 0,
        lta: 0,
        otherAllowances: 0,
        fdInterestAnnual: 0,
        savingsInterestAnnual: 0,
        otherIncome: 0,
        rentalIncomeAnnual: 0,
        isBlended: false // disable blended override
      };

      // Recalculate HRA if rent is paid? No, let's keep HRA exemption fixed to what they actually get right now, 
      // or assume 0 HRA for the extra income. It's complex. 
      // A simpler approximation: just add the difference to `otherIncome`.
      const diff = gross - userGross;
      const proxyInputs = {
        ...currentInputs,
        otherIncome: Number(currentInputs.otherIncome || 0) + diff
      };

      try {
        const results = calculateTax(proxyInputs);
        const oldTax = results.old.totalTax;
        const newTax = results.new.totalTax;
        
        maxT = Math.max(maxT, oldTax, newTax);

        points.push({
          gross,
          oldTax,
          newTax
        });

        // Find crossover: where newTax becomes less than oldTax
        if (!intersection && points.length > 1) {
          const prev = points[points.length - 2];
          if ((prev.oldTax <= prev.newTax && oldTax > newTax) || (prev.oldTax >= prev.newTax && oldTax < newTax)) {
            intersection = gross;
          }
        }
      } catch (e) {
        // ignore errors in simulation
      }
    }

    return { dataPoints: points, crossoverIncome: intersection, maxTax: maxT };
  }, [currentInputs]);

  if (!dataPoints || dataPoints.length === 0) return null;

  // SVG Drawing constants
  const width = 600;
  const height = 250;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 40;
  
  const minGross = dataPoints[0].gross;
  const maxGross = dataPoints[dataPoints.length - 1].gross;

  const scaleX = (gross) => paddingLeft + ((gross - minGross) / (maxGross - minGross)) * (width - paddingLeft - paddingRight);
  const scaleY = (tax) => height - paddingBottom - ((tax / maxTax) * (height - paddingTop - paddingBottom));

  // Generate SVG path strings
  const oldPath = dataPoints.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.gross)} ${scaleY(d.oldTax)}`).join(' ');
  const newPath = dataPoints.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.gross)} ${scaleY(d.newTax)}`).join(' ');

  return (
    <div style={{ backgroundColor: 'var(--color-surface-2)', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid var(--color-surface-3)' }}>
      <h3 style={{ color: 'var(--color-navy-900)', marginBottom: '0.5rem' }}>The Crossover Point</h3>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '1.5rem' }}>
        Based on your current investments, here is how your tax changes if your income increases. 
        {crossoverIncome ? ` Above ₹${(crossoverIncome/100000).toFixed(1)}L, the New Regime is strictly better.` : ''}
      </p>

      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', minWidth: '500px', height: 'auto' }}>
          {/* Grid lines (Y Axis) */}
          {[0, 0.25, 0.5, 0.75, 1].map(tick => (
            <g key={`y-${tick}`}>
              <line 
                x1={paddingLeft} 
                y1={scaleY(maxTax * tick)} 
                x2={width - paddingRight} 
                y2={scaleY(maxTax * tick)} 
                stroke="var(--color-surface-3)" 
                strokeDasharray="4 4" 
              />
              <text 
                x={paddingLeft - 10} 
                y={scaleY(maxTax * tick) + 4} 
                fontSize="10" 
                textAnchor="end" 
                fill="var(--color-text-muted)"
              >
                {(maxTax * tick / 1000).toFixed(0)}k
              </text>
            </g>
          ))}

          {/* X Axis */}
          <line 
            x1={paddingLeft} 
            y1={height - paddingBottom} 
            x2={width - paddingRight} 
            y2={height - paddingBottom} 
            stroke="var(--color-surface-3)" 
          />
          {[0, 0.25, 0.5, 0.75, 1].map(tick => {
            const grossVal = minGross + (maxGross - minGross) * tick;
            return (
              <text 
                key={`x-${tick}`}
                x={scaleX(grossVal)} 
                y={height - paddingBottom + 15} 
                fontSize="10" 
                textAnchor="middle" 
                fill="var(--color-text-muted)"
              >
                {(grossVal / 100000).toFixed(1)}L
              </text>
            );
          })}

          {/* Axis Titles */}
          <text 
            x={width / 2} 
            y={height - 5} 
            fontSize="12" 
            fontWeight="bold"
            textAnchor="middle" 
            fill="var(--color-navy-900)"
          >
            Gross Annual Income
          </text>

          <text 
            x={15} 
            y={height / 2} 
            fontSize="12" 
            fontWeight="bold"
            textAnchor="middle" 
            fill="var(--color-navy-900)"
            transform={`rotate(-90, 15, ${height / 2})`}
          >
            Total Tax Payable
          </text>

          {/* Hover Vertical Line */}
          {hoverData && (
            <line 
              x1={scaleX(hoverData.gross)} 
              y1={paddingTop} 
              x2={scaleX(hoverData.gross)} 
              y2={height - paddingBottom} 
              stroke="var(--color-text-muted)" 
              strokeDasharray="4 4" 
            />
          )}

          {/* Lines */}
          <path d={oldPath} fill="none" stroke="var(--color-navy-900)" strokeWidth="3" />
          <path d={newPath} fill="none" stroke="var(--color-teal-500)" strokeWidth="3" />

          {/* Crossover Marker */}
          {crossoverIncome && (
            <g>
              <line 
                x1={scaleX(crossoverIncome)} 
                y1={paddingTop} 
                x2={scaleX(crossoverIncome)} 
                y2={height - paddingBottom} 
                stroke="var(--color-error)" 
                strokeDasharray="4 4" 
              />
              <circle cx={scaleX(crossoverIncome)} cy={scaleY(dataPoints.find(d => d.gross === crossoverIncome)?.newTax || 0)} r="5" fill="var(--color-error)" />
              <text x={scaleX(crossoverIncome)} y={paddingTop - 10} fontSize="12" fill="var(--color-error)" textAnchor="middle" fontWeight="bold">
                ₹{(crossoverIncome/100000).toFixed(1)}L
              </text>
            </g>
          )}

          {/* Interaction Overlay */}
          {dataPoints.map((d, i) => (
            <rect
              key={i}
              x={scaleX(d.gross) - ((width - paddingLeft - paddingRight) / dataPoints.length) / 2}
              y={paddingTop}
              width={(width - paddingLeft - paddingRight) / dataPoints.length}
              height={height - paddingTop - paddingBottom}
              fill="transparent"
              onMouseEnter={() => setHoverData(d)}
              onMouseLeave={() => setHoverData(null)}
            />
          ))}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', fontSize: '12px', fontWeight: 'bold' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-navy-900)', borderRadius: '2px' }}></div>
            Old Regime
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-teal-500)', borderRadius: '2px' }}></div>
            New Regime
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoverData && (
          <div style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-white)', 
            padding: '10px', 
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid var(--color-surface-3)',
            pointerEvents: 'none',
            fontSize: '12px',
            zIndex: 10
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', textAlign: 'center' }}>Gross: ₹{(hoverData.gross/100000).toFixed(2)}L</div>
            <div style={{ color: 'var(--color-navy-900)' }}>Old Tax: ₹{Math.round(hoverData.oldTax).toLocaleString('en-IN')}</div>
            <div style={{ color: 'var(--color-teal-500)' }}>New Tax: ₹{Math.round(hoverData.newTax).toLocaleString('en-IN')}</div>
          </div>
        )}
      </div>
    </div>
  );
}
