import Link from "next/link";
import { STORES } from "@/lib/stores";

// トップページ：店舗を選ぶだけのシンプルな入口
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <header className="mb-8 text-center sm:mb-12">
        <h1 className="text-2xl font-bold sm:text-3xl">
          PFCバランス ごはん提案
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          コンビニ・ファストフードのメニューから、
          <br className="sm:hidden" />
          目標のPFC（タンパク質・脂質・炭水化物）に近いものを提案します。
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          店舗を選んでください
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STORES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50"
              >
                <span className="text-2xl" aria-hidden>
                  {s.emoji}
                </span>
                <span className="text-base font-medium">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 text-center text-xs text-slate-400">
        現在はダミーデータで動作しています
      </footer>
    </main>
  );
}
