// 店舗の一覧と、JSONデータの読み込み

import type { StoreData } from "./types";
import seven from "@/data/seven.json";
import mcdonalds from "@/data/mcdonalds.json";
import matsuya from "@/data/matsuya.json";
import lawson from "@/data/lawson.json";
import familymart from "@/data/familymart.json";
import sukiya from "@/data/sukiya.json";

// 表示順は STORES の並びに従う
export const STORES: { slug: string; name: string; emoji: string }[] = [
  { slug: "seven", name: "セブン-イレブン", emoji: "🏪" },
  { slug: "lawson", name: "ローソン", emoji: "🏪" },
  { slug: "familymart", name: "ファミリーマート", emoji: "🏪" },
  { slug: "mcdonalds", name: "マクドナルド", emoji: "🍔" },
  { slug: "matsuya", name: "松屋", emoji: "🍚" },
  { slug: "sukiya", name: "すき家", emoji: "🍚" },
];

const STORE_DATA: Record<string, StoreData> = {
  seven: seven as StoreData,
  mcdonalds: mcdonalds as StoreData,
  matsuya: matsuya as StoreData,
  lawson: lawson as StoreData,
  familymart: familymart as StoreData,
  sukiya: sukiya as StoreData,
};

export function getStoreData(slug: string): StoreData | null {
  return STORE_DATA[slug] ?? null;
}
