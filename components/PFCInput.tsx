"use client";

// 目標PFCを入力するフォーム。プリセット（増量/維持/減量）でワンタップ入力も可能。

import { PRESETS } from "@/lib/score";
import type { TargetPFC } from "@/lib/types";

type Props = {
  value: TargetPFC;
  onChange: (next: TargetPFC) => void;
};

export function PFCInput({ value, onChange }: Props) {
  // 数字入力のヘルパー（空欄を許すと扱いが面倒なので、0以上の数値だけ受ける）
  function setField(field: keyof TargetPFC, raw: string) {
    const n = Number(raw);
    onChange({
      ...value,
      [field]: Number.isFinite(n) && n >= 0 ? n : 0,
    });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-700">
        目標PFC（1食あたりの目安）
      </h2>

      {/* プリセットボタン */}
      <div className="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.target)}
            className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-400 hover:bg-emerald-50"
          >
            {p.label}
            <span className="ml-1 text-slate-400">
              P{p.target.protein}/F{p.target.fat}/C{p.target.carbs}
            </span>
          </button>
        ))}
      </div>

      {/* 数値入力 */}
      <div className="grid grid-cols-3 gap-3">
        <Field
          label="タンパク質"
          unit="g"
          value={value.protein}
          onChange={(v) => setField("protein", v)}
        />
        <Field
          label="脂質"
          unit="g"
          value={value.fat}
          onChange={(v) => setField("fat", v)}
        />
        <Field
          label="炭水化物"
          unit="g"
          value={value.carbs}
          onChange={(v) => setField("carbs", v)}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  unit,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (raw: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-600">{label}</span>
      <span className="mt-1 flex items-center gap-1">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-right text-base focus:border-emerald-500 focus:outline-none"
        />
        <span className="text-xs text-slate-500">{unit}</span>
      </span>
    </label>
  );
}
