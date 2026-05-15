import Link from "next/link";
import { STORES } from "@/lib/stores";

// トップページ：Canvaデザインに合わせたスタイル
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-sm px-6 py-12">
      {/* タイトル */}
      <header className="mb-8 text-center">
        <h1
          className="text-5xl font-black tracking-tight leading-none"
          style={{ color: "#2D6A4F" }}
        >
          PFC
        </h1>
        <p className="mt-1 text-base font-semibold" style={{ color: "#2D6A4F" }}>
          ごはん提案アプリ
        </p>
        <p className="mt-3 text-xs text-stone-500">
          コンビニ・ファストフードのメニューから、
          <br />
          目標のPFCに近いものを提案します。
        </p>
      </header>

      {/* 店舗カード グリッド */}
      <section>
        <p className="mb-3 text-xs font-semibold text-stone-500">店舗を選んでください</p>
        <ul className="grid grid-cols-2 gap-3">
          {STORES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md active:scale-95"
                style={{ minHeight: "110px" }}
              >
                <span
                  className="text-sm font-bold text-center leading-tight"
                  style={{ color: "#2D6A4F" }}
                >
                  {s.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-10 text-center text-xs text-stone-400">
        現在はダミーデータで動作しています
      </footer>
    </main>
  );
}
