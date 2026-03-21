'use client';

import { PACType, InstallationStep } from '@/lib/pac-editorial-data';

// ============================================================================
// Data Types for each infographic type
// ============================================================================

export interface ComparisonData {
  items: PACType[];
}

export interface TimelineData {
  steps: InstallationStep[];
}

export interface StatsData {
  stats: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
}

export interface TableData {
  headers: string[];
  rows: Array<{
    cells: string[];
    highlight?: boolean;
  }>;
}

export type InfographicData = ComparisonData | TimelineData | StatsData | TableData;

interface InfographicBlockProps {
  type: 'comparison' | 'timeline' | 'stats' | 'table';
  data: InfographicData;
  caption?: string;
  source?: string;
}

/**
 * InfographicBlock - Bloc visuel pour données
 * 
 * Types:
 * - comparison: Grid de cartes comparant les types de PAC
 * - timeline: Timeline verticale pour les étapes d'installation
 * - stats: Grandes cartes de statistiques avec icônes
 * - table: Tableau responsive pour les aides financières
 * 
 * Style: fond slate-50, rounded-2xl, padding généreux
 * Responsive: version simplifiée sur mobile
 * 
 * Requirements: 2.3, 5.8, 7.4, 11.6
 */
export function InfographicBlock({ type, data, caption, source }: InfographicBlockProps) {
  return (
    <div 
      className="bg-slate-50 rounded-2xl p-6 md:p-8 my-8"
      data-testid="infographic-block"
      data-type={type}
    >
      {type === 'comparison' && <ComparisonLayout data={data as ComparisonData} />}
      {type === 'timeline' && <TimelineLayout data={data as TimelineData} />}
      {type === 'stats' && <StatsLayout data={data as StatsData} />}
      {type === 'table' && <TableLayout data={data as TableData} />}
      
      {(caption || source) && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          {caption && (
            <p className="text-sm text-slate-600 italic">{caption}</p>
          )}
          {source && (
            <p className="text-xs text-slate-400 mt-1">Source : {source}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Comparison Layout - Grid de cartes pour comparatif types PAC
// ============================================================================

function ComparisonLayout({ data }: { data: ComparisonData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {data.items.map((pac) => (
        <div 
          key={pac.id}
          className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{pac.name}</h3>
              <p className="text-sm text-slate-500">{pac.description}</p>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
              COP {pac.cop.min}-{pac.cop.max}
            </span>
          </div>
          
          <div className="mb-4">
            <p className="text-2xl font-bold text-slate-900">
              {formatPrice(pac.priceRange.min)} - {formatPrice(pac.priceRange.max)}
              {pac.priceRange.unit && (
                <span className="text-sm font-normal text-slate-500 ml-1">
                  {pac.priceRange.unit}
                </span>
              )}
            </p>
            <p className="text-sm text-emerald-600 font-medium">
              Économies : {pac.savings}
            </p>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Avantages
              </p>
              <ul className="space-y-1">
                {pac.advantages.slice(0, 3).map((adv, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <p className="mt-4 text-xs text-slate-400 italic">
            Idéal pour : {pac.idealFor}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Timeline Layout - Timeline verticale pour processus installation
// ============================================================================

function TimelineLayout({ data }: { data: TimelineData }) {
  return (
    <div className="relative">
      {/* Ligne verticale */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-emerald-200" />
      
      <div className="space-y-6">
        {data.steps.map((step) => (
          <div key={step.step} className="relative flex gap-4 md:gap-6">
            {/* Numéro d'étape */}
            <div className="relative z-10 flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">{step.step}</span>
            </div>
            
            {/* Contenu */}
            <div className="flex-1 bg-white rounded-xl p-4 md:p-5 shadow-sm border border-slate-100 pb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <h3 className="font-bold text-slate-900">{step.title}</h3>
                <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full w-fit">
                  {step.duration}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Stats Layout - Grandes cartes de statistiques
// ============================================================================

function StatsLayout({ data }: { data: StatsData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {data.stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-100"
        >
          <p className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
            {stat.value}
          </p>
          <p className="text-lg font-medium text-slate-900 mb-1">
            {stat.label}
          </p>
          {stat.description && (
            <p className="text-sm text-slate-500">
              {stat.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Table Layout - Tableau responsive pour aides financières
// ============================================================================

function TableLayout({ data }: { data: TableData }) {
  return (
    <div className="overflow-x-auto -mx-6 md:-mx-8 px-6 md:px-8">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b-2 border-slate-200">
            {data.headers.map((header, i) => (
              <th 
                key={i}
                className="text-left py-3 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`border-b border-slate-100 ${
                row.highlight ? 'bg-emerald-50' : 'bg-white'
              }`}
            >
              {row.cells.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  className={`py-4 px-4 text-sm ${
                    cellIndex === 0 ? 'font-medium text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Utility Functions
// ============================================================================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}
