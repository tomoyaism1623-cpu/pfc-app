// 2品セットカード
// 2つのメニューを組み合わせて、合算PFCを表示する

import type { TargetPFC } from "@/lib/types";
import type { ItemPair } from "@/lib/score";

type Props = {
  pair: ItemPair;
  target: TargetPFC;
  rank: number;
};

export function PairCard({ pair, rank }: Props) {
  const isTop = rank === 1;
  const [a, b] = pair.items;

  return (
    <li
      className={`rounded-xl bg-white px-4 py-3 shadow-sm ${
        isTop ? "border-l-4" : ""
      }`}
      style={isTop ? { borderLeftColor: "#52B788" } : {}}
    >
      {/* ランク */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black" style={{ color: "#52B788" }}>
          {rank}位
        </span>
        <span className="text-sm font-bold" style={{ color: "#2D6A4F" }}>
          ¥{pair.combinedPrice}
        </span>
      </div>

      {/* 商品名2行 */}
      <div className="mb-2 space-y-0.5">
        <p className="text-sm font-bold text-stone-800 truncate">
          {a.name}
        </p>
        <p className="text-[11px] text-stone-500">
          P:{a.protein}g　F:{a.fat}g　C:{a.carbs}g　{a.calories}kcal　¥{a.price}
        </p>
        <p className="text-sm font-bold text-stone-800 truncate mt-1">
          {b.name}
        </p>
        <p className="text-[11px] text-stone-500">
          P:{b.protein}g　F:{b.fat}g　C:{b.carbs}g　{b.calories}kcal　¥{b.price}
        </p>
      </div>

      {/* 区切り線 */}
      <div className="border-t border-stone-100 pt-2">
        <p className="text-[10px] font-semibold text-stone-500">
          合計　P:{pair.combinedProtein.toFixed(1)}g　F:{pair.combinedFat.toFixed(1)}g　C:{pair.combinedCarbs.toFixed(1)}g　{pair.combinedCalories}kcal
        </p>
      </div>
    </li>
  );
}
