import { apiBase } from './client';

export type RecommendRequest = {
  salary: number;
  monthlyCarBudget: number;
  desiredYear: number;
};

export async function recommend(payload: RecommendRequest) {
  const res = await fetch(`${apiBase}/api/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json();
}
