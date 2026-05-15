// 1メニューを表示するカード。PFCのバーで視覚的にわかりやすくする。

import type { MenuItem, TargetPFC } from "@/lib/types";

type Props = {
  item: MenuItem;
  target: TargetPFC;
  rank: number; // 1始まり
};

export function MenuCard({ item, target, rank }: Props) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="mr-2 inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-700">
            {rank}位
          </span>
          <span className="text-base font-semibold">{item.name}</span>
          <div className="mt-0.5 text-xs text-slate-500">
            {item.category}
            {typeof item.price === "number" && (
              <span className="ml-2">¥{item.price}</span>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-bold">{item.calories}</div>
          <div className="text-[10px] leading-none text-slate-500">kcal</div>
        </div>
      </div>

      {/* PFC 数値 + 目標との差 */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Macro label="P" value={item.protein} target={target.protein} color="emerald" />
        <Macro label="F" value={item.fat} target={target.fat} color="amber" />
        <Macro label="C" value={item.carbs} target={target.carbs} color="sky" />
      </div>
    </li>
  );
}

function Macro({
  label,
  value,
  target,
  color,
}: {
  label: string;
  value: number;
  target: number;
  color: "emerald" | "amber" | "sky";
}) {
  const diff = value - target;
  const diffText =
    target === 0
      ? `${value}g`
      : `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}g`;

  const colorClass = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    sky: "bg-sky-500",
  }[color];

  // バー幅：目標との比較で 0〜100%
  const max = Math.max(target * 1.5, value, 1);
  const widthPct = Math.min(100, (value / max) * 100);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-bold text-slate-500">{label}</span>
        <span className="text-xs font-medium">{value}g</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100">
        <div
          className={`h-1.5 rounded-full ${colorClass}`}
          style={{ width: `${widthPct}%` }}
        />
      </div>
      <div className="mt-0.5 text-[10px] text-slate-400">差 {diffText}</div>
    </div>
  );
}
