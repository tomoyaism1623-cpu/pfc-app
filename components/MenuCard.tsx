// メニューカード（Canvaデザイン準拠）
// 1位はグリーンのハイライトバー付き、それ以外はシンプルなリスト行

import type { MenuItem, TargetPFC } from "@/lib/types";

type Props = {
  item: MenuItem;
  target: TargetPFC;
  rank: number;
};

export function MenuCard({ item, rank }: Props) {
  const isTop = rank === 1;

  return (
    <li
      className={`rounded-xl bg-white px-4 py-3 shadow-sm ${
        isTop ? "border-l-4" : ""
      }`}
      style={isTop ? { borderLeftColor: "#52B788" } : {}}
    >
      <div className="flex items-center justify-between gap-2">
        {/* 左：ランク＋商品名 */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span
              className="shrink-0 text-[10px] font-black"
              style={{ color: "#52B788" }}
            >
              {rank}位
            </span>
            {item.limited && (
              <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: "#E07B54" }}>
                期間限定
              </span>
            )}
            {item.category === "セット" && (
              <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "#E8DCC8", color: "#2D6A4F" }}>
                セット
              </span>
            )}
            <span className="truncate text-sm font-bold text-stone-800">
              {item.name}
            </span>
          </div>
          {isTop && (
            <div className="mt-1 h-1 w-full rounded-full bg-stone-100">
              <div
                className="h-1 rounded-full"
                style={{
                  width: `${Math.min(100, (item.protein / 40) * 100)}%`,
                  background: "#52B788",
                }}
              />
            </div>
          )}
          <p className="mt-1 text-[10px] text-stone-400">
            P:{item.protein}g　F:{item.fat}g　C:{item.carbs}g　{item.calories}kcal
          </p>
        </div>

        {/* 右：価格 */}
        {typeof item.price === "number" && (
          <span className="shrink-0 text-sm font-bold" style={{ color: "#2D6A4F" }}>
            ¥{item.price}
          </span>
        )}
      </div>
    </li>
  );
}
