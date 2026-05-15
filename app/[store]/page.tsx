// 店舗別ページ：URL の [store] からデータを取り、クライアント側で並び替え表示
// Next.js 16 では params は Promise なので use() で解決する

"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoreData, STORES } from "@/lib/stores";
import { PRESETS, sortByCloseness } from "@/lib/score";
import { PFCInput } from "@/components/PFCInput";
import { MenuCard } from "@/components/MenuCard";
import type { TargetPFC } from "@/lib/types";

type PageParams = { store: string };

export default function StorePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { store } = use(params);
  const data = getStoreData(store);
  if (!data) notFound();

  // 初期値は「維持」プリセット
  const [target, setTarget] = useState<TargetPFC>(PRESETS[1].target);

  // 並び替え結果（target が変わるたびに計算）
  const sorted = useMemo(
    () => sortByCloseness(data.items, target),
    [data.items, target]
  );

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:py-10">
      {/* ヘッダー：店舗切り替えタブ */}
      <header className="mb-4">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-emerald-600"
        >
          ← トップへ
        </Link>
        <h1 className="mt-1 text-xl font-bold sm:text-2xl">
          {data.store_name}
        </h1>

        <nav className="mt-3 flex gap-2 overflow-x-auto">
          {STORES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className={
                s.slug === store
                  ? "shrink-0 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white"
                  : "shrink-0 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:border-emerald-400"
              }
            >
              {s.emoji} {s.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* 入力フォーム */}
      <div className="mb-4">
        <PFCInput value={target} onChange={setTarget} />
      </div>

      {/* メニュー一覧（目標に近い順） */}
      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-700">
          おすすめ順（目標に近い順）
        </h2>
        <ul className="space-y-2">
          {sorted.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              target={target}
              rank={i + 1}
            />
          ))}
        </ul>
      </section>

      <p className="mt-6 text-center text-[10px] text-slate-400">
        {data.note ?? ""}
      </p>
    </main>
  );
}
