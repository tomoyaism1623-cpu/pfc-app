"use client";

// 目標PFCを入力するフォーム（Canvaデザイン準拠）

import { PRESETS } from "@/lib/score";
import type { TargetPFC } from "@/lib/types";

type Props = {
  value: TargetPFC;
  onChange: (next: TargetPFC) => void;
};

export function PFCInput({ value, onChange }: Props) {
  function setField(field: keyof TargetPFC, raw: string) {
    const n = Number(raw);
    onChange({ ...value, [field]: Number.isFinite(n) && n >= 0 ? n : 0 });
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="mb-3 text-xs font-semibold text-stone-500">目標PFC入力（1食あたり）</p>

      {/* プリセットボタン */}
      <div className="mb-4 flex gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.target)}
            className="flex-1 rounded-full py-1.5 text-xs font-bold transition-all"
            style={{
              background:
                value.protein === p.target.protein &&
                value.fat === p.target.fat &&
                value.carbs === p.target.carbs
                  ? "#2D6A4F"
                  : "#D8F3DC",
              color:
                value.protein === p.target.protein &&
                value.fat === p.target.fat &&
                value.carbs === p.target.carbs
                  ? "#ffffff"
                  : "#2D6A4F",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 数値入力 */}
      <div className="grid grid-cols-3 gap-2">
        {(["protein", "fat", "carbs"] as const).map((field) => {
          const labels = { protein: "タンパク質", fat: "脂質", carbs: "炭水化物" };
          return (
            <label key={field} className="block">
              <span className="block text-[10px] font-semibold mb-1" style={{ color: "#2D6A4F" }}>
                {labels[field]}
              </span>
              <div className="flex items-center gap-0.5">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  value={value[field]}
                  onChange={(e) => setField(field, e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5 text-right text-sm font-bold focus:outline-none"
                  style={{ color: "#2D6A4F" }}
                />
                <span className="text-[10px] text-stone-400 shrink-0">g</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
