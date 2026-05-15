// 目標PFCとメニューPFCの「近さ」を計算する関数
// 数字が小さいほど目標に近い

import type { MenuItem, TargetPFC } from "./types";

// 重み付け：筋トレ用途を想定し、デフォルトでタンパク質を重視する
// 大きい数字ほど「ズレを許さない」項目になる
export const DEFAULT_WEIGHTS = {
  protein: 2.0,
  fat: 1.0,
  carbs: 1.0,
};

export type Weights = typeof DEFAULT_WEIGHTS;

// 1メニューに対するスコア（小さいほど目標に近い）
export function scoreItem(
  target: TargetPFC,
  item: MenuItem,
  weights: Weights = DEFAULT_WEIGHTS
): number {
  const dp = weights.protein * (target.protein - item.protein) ** 2;
  const df = weights.fat * (target.fat - item.fat) ** 2;
  const dc = weights.carbs * (target.carbs - item.carbs) ** 2;
  return Math.sqrt(dp + df + dc);
}

// メニューを目標に近い順に並べ替えて返す
export function sortByCloseness(
  items: MenuItem[],
  target: TargetPFC,
  weights: Weights = DEFAULT_WEIGHTS
): MenuItem[] {
  return [...items].sort(
    (a, b) => scoreItem(target, a, weights) - scoreItem(target, b, weights)
  );
}

// 2品の組み合わせを試して、目標に最も近いペアを返す
// 全組み合わせ（nC2）を計算し、合算PFCとのスコアで比較する
export type ItemPair = {
  items: [MenuItem, MenuItem];
  combinedProtein: number;
  combinedFat: number;
  combinedCarbs: number;
  combinedCalories: number;
  combinedPrice: number;
  score: number;
};

export function bestPairs(
  items: MenuItem[],
  target: TargetPFC,
  weights: Weights = DEFAULT_WEIGHTS,
  topN: number = 5
): ItemPair[] {
  const pairs: ItemPair[] = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];

      // 2品の合算PFC
      const combined: TargetPFC = {
        protein: a.protein + b.protein,
        fat: a.fat + b.fat,
        carbs: a.carbs + b.carbs,
      };

      // 合算PFCと目標の距離スコア
      const dp = weights.protein * (target.protein - combined.protein) ** 2;
      const df = weights.fat * (target.fat - combined.fat) ** 2;
      const dc = weights.carbs * (target.carbs - combined.carbs) ** 2;
      const score = Math.sqrt(dp + df + dc);

      pairs.push({
        items: [a, b],
        combinedProtein: combined.protein,
        combinedFat: combined.fat,
        combinedCarbs: combined.carbs,
        combinedCalories: a.calories + b.calories,
        combinedPrice: (a.price ?? 0) + (b.price ?? 0),
        score,
      });
    }
  }

  // スコアが小さい順（目標に近い順）に並べて上位 topN 件返す
  return pairs.sort((a, b) => a.score - b.score).slice(0, topN);
}

// プリセット（用途別の典型値、1食分の目安）
export const PRESETS: { id: string; label: string; target: TargetPFC }[] = [
  {
    id: "bulk",
    label: "増量",
    target: { protein: 40, fat: 20, carbs: 100 },
  },
  {
    id: "maintain",
    label: "維持",
    target: { protein: 30, fat: 15, carbs: 70 },
  },
  {
    id: "cut",
    label: "減量",
    target: { protein: 35, fat: 8, carbs: 40 },
  },
];
