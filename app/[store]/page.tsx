"use client";

// 店舗別ページ（Canvaデザイン準拠）
// Next.js 16 では params は Promise なので use() で解決する

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoreData, STORES } from "@/lib/stores";
import { PRESETS, sortByCloseness, bestPairs } from "@/lib/score";
import { PFCInput } from "@/components/PFCInput";
import { MenuCard } from "@/components/MenuCard";
import { PairCard } from "@/components/PairCard";
import type { TargetPFC } from "@/lib/types";

type PageParams = { store: string };
type Mode = "single" | "pair";

export default function StorePage({ params }: { params: Promise<PageParams> }) {
  const { store } = use(params);
  const data = getStoreData(store);
  if (!data) notFound();

  const [target, setTarget] = useState<TargetPFC>(PRESETS[1].target);
  const [mode, setMode] = useState<Mode>("single");

  const sorted = useMemo(
    () => sortByCloseness(data.items, target),
    [data.items, target]
  );

  const pairs = useMemo(
    () => bestPairs(data.items, target),
    [data.items, target]
  );

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-6">

      {/* ヘッダー */}
      <header className="mb-4">
        <Link href="/" className="text-xs text-stone-400 hover:text-stone-600">
          ← もどる
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <div>
            <h1 className="text-lg font-black leading-tight" style={{ color: "#2D6A4F" }}>
              {data.store_name}
            </h1>
            <p className="text-[10px] text-stone-400">目標PFC入力</p>
          </div>
        </div>

        {/* 店舗切り替えタブ */}
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {STORES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="shrink-0 rounded-full px-3 py-1 text-xs font-bold transition-all"
              style={
                s.slug === store
                  ? { background: "#2D6A4F", color: "#fff" }
                  : { background: "#fff", color: "#2D6A4F" }
              }
            >
              {s.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* PFC入力 */}
      <div className="mb-4">
        <PFCInput value={target} onChange={setTarget} />
      </div>

      {/* 単品 / 2品セット トグル */}
      <div className="mb-3 flex rounded-full p-1" style={{ background: "#E8DCC8" }}>
        <button
          onClick={() => setMode("single")}
          className="flex-1 rounded-full py-1.5 text-xs font-bold transition-all"
          style={
            mode === "single"
              ? { background: "#2D6A4F", color: "#fff" }
              : { background: "transparent", color: "#2D6A4F" }
          }
        >
          単品
        </button>
        <button
          onClick={() => setMode("pair")}
          className="flex-1 rounded-full py-1.5 text-xs font-bold transition-all"
          style={
            mode === "pair"
              ? { background: "#2D6A4F", color: "#fff" }
              : { background: "transparent", color: "#2D6A4F" }
          }
        >
          2品セット
        </button>
      </div>

      {/* メニュー一覧 */}
      <section>
        <p className="mb-2 text-xs font-semibold text-stone-500">
          おすすめ順（目標に近い順）
        </p>

        {mode === "single" ? (
          <ul className="space-y-2">
            {sorted.map((item, i) => (
              <MenuCard key={item.id} item={item} target={target} rank={i + 1} />
            ))}
          </ul>
        ) : (
          <ul className="space-y-2">
            {pairs.map((pair, i) => (
              <PairCard key={`${pair.items[0].id}-${pair.items[1].id}`} pair={pair} target={target} rank={i + 1} />
            ))}
          </ul>
        )}
      </section>

      <p className="mt-6 text-center text-[10px] text-stone-400">
        {data.note ?? ""}
      </p>
    </main>
  );
}
