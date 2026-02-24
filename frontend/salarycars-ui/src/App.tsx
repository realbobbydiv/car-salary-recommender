import { useMemo, useState, type CSSProperties } from 'react';
import './App.css';

type CarRecommendation = {
  title: string;
  estimatedMonthlyCost: number;
  percentOfSalary: number;
  percentOfBudget?: number;
  tier: string;
};

type RecommendResponse = {
  monthlySalary: number;
  annualSalary: number;
  monthlyCarBudget: number;
  top3: CarRecommendation[];
};

export default function App() {
  const [salary, setSalary] = useState<number>(1900);
  const [budget, setBudget] = useState<number>(550);
  const [desiredYear, setDesiredYear] = useState<number>(2017);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RecommendResponse | null>(null);

  const apiBase = useMemo(() => (import.meta.env.VITE_API_BASE as string) ?? 'http://localhost:5000', []);

  async function onRecommend() {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`${apiBase}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary, monthlyCarBudget: budget, desiredYear }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const json = (await res.json()) as RecommendResponse;
      setData(json);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>SalaryCars</h1>
        <p style={{ marginTop: 6, color: '#9ca3af' }}>Enter your salary & car budget and get the best 3 matches.</p>
      </header>

      <section style={panelStyle}>
        <div style={inputsGridStyle}>
          <label style={labelStyle}>
            <span style={labelTextStyle}>Monthly salary</span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              style={inputStyle}
              placeholder="e.g. 1900"
            />
          </label>

          <label style={labelStyle}>
            <span style={labelTextStyle}>Monthly car budget</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={inputStyle}
              placeholder="e.g. 550"
            />
          </label>

          <label style={labelStyle}>
            <span style={labelTextStyle}>Desired year (min)</span>
            <input
              type="number"
              value={desiredYear}
              onChange={(e) => setDesiredYear(Number(e.target.value))}
              style={inputStyle}
              placeholder="e.g. 2017"
            />
          </label>
        </div>

        <button onClick={onRecommend} disabled={loading} style={buttonStyle(loading)}>
          {loading ? 'Recommending...' : 'Recommend'}
        </button>

        {error && (
          <div style={errorBoxStyle}>
            <b style={{ color: '#fecaca' }}>Error:</b> <span style={{ color: '#fee2e2' }}>{error}</span>
          </div>
        )}
      </section>

      {data && (
        <section style={{ marginTop: 18 }}>
          <div style={metaRowStyle}>
            <span>
              Salary: <b style={{ color: '#fff' }}>{data.monthlySalary}</b>
            </span>
            <span>
              Budget: <b style={{ color: '#fff' }}>{data.monthlyCarBudget}</b>
            </span>
            <span>
              Annual: <b style={{ color: '#fff' }}>{data.annualSalary}</b>
            </span>
          </div>

          <div style={cardsGridStyle}>
            {data.top3.map((c) => (
              <div key={c.title} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <h3 style={{ margin: 0, color: '#fff' }}>{c.title}</h3>
                  <span style={badgeStyle(c.tier)}>{c.tier}</span>
                </div>

                <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                  <Row label="Est. monthly cost" value={`${c.estimatedMonthlyCost.toFixed(2)}`} />
                  <Row label="% of salary" value={`${c.percentOfSalary.toFixed(1)}%`} />
                  {typeof c.percentOfBudget === 'number' && <Row label="% of budget" value={`${c.percentOfBudget.toFixed(1)}%`} />}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer style={{ marginTop: 20, color: '#9ca3af', fontSize: 13 }}>
        Tip: If you get CORS errors, enable CORS in ASP.NET or proxy via Vite.
      </footer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ color: '#9ca3af' }}>{label}</span>
      <b style={{ color: '#fff' }}>{value}</b>
    </div>
  );
}

/** Styles */
const pageStyle: CSSProperties = {
  maxWidth: 980,
  margin: '0 auto',
  padding: 20,
  fontFamily: 'system-ui',
  background: '#0b0b10',
  color: '#e5e7eb',
  minHeight: '100vh',
};

const panelStyle: CSSProperties = {
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 16,
  padding: 16,
  background: 'rgba(255,255,255,0.04)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
};

const inputsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 12,
};

const labelStyle: CSSProperties = {
  display: 'grid',
  gap: 6,
};

const labelTextStyle: CSSProperties = {
  color: '#9ca3af',
  fontSize: 13,
};

const inputStyle: CSSProperties = {
  padding: '10px 12px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.12)',
  outline: 'none',
  backgroundColor: '#111827', // dark input
  color: '#ffffff', // visible text
};

const metaRowStyle: CSSProperties = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  color: '#9ca3af',
};

const cardsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 12,
  marginTop: 12,
};

const cardStyle: CSSProperties = {
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 16,
  padding: 14,
  background: 'rgba(255,255,255,0.05)',
  color: '#e5e7eb',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
};

const errorBoxStyle: CSSProperties = {
  marginTop: 14,
  padding: 12,
  border: '1px solid rgba(239, 68, 68, 0.35)',
  borderRadius: 12,
  background: 'rgba(239, 68, 68, 0.10)',
};

function buttonStyle(loading: boolean): CSSProperties {
  return {
    marginTop: 14,
    padding: '10px 14px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.12)',
    background: loading ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)',
    color: '#fff',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontWeight: 700,
  };
}

function badgeStyle(tier: string): CSSProperties {
  const base: CSSProperties = {
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 12,
    border: '1px solid rgba(255,255,255,0.16)',
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    alignSelf: 'flex-start',
    whiteSpace: 'nowrap',
    fontWeight: 700,
  };

  const t = tier.toLowerCase();
  if (t.includes('risk')) return { ...base, borderColor: 'rgba(239, 68, 68, 0.55)', background: 'rgba(239, 68, 68, 0.15)' };
  if (t.includes('border')) return { ...base, borderColor: 'rgba(245, 158, 11, 0.55)', background: 'rgba(245, 158, 11, 0.15)' };
  return { ...base, borderColor: 'rgba(34, 197, 94, 0.55)', background: 'rgba(34, 197, 94, 0.15)' };
}