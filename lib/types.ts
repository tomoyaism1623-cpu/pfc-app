// 商品データの型定義（全ファイルで使う共通の型）

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  protein: number; // タンパク質（g）
  fat: number;     // 脂質（g）
  carbs: number;   // 炭水化物（g）
  calories: number; // カロリー（kcal）
  price?: number;
  limited?: boolean;       // 期間限定フラグ
  limited_until?: string;  // 販売終了予定日（任意）
};

export type StoreData = {
  store: string;       // セブン=seven などの英字キー
  store_name: string;  // 表示用の店舗名
  updated_at: string;
  note?: string;
  items: MenuItem[];
};

// 目標PFC（ユーザーが入力する値）
export type TargetPFC = {
  protein: number;
  fat: number;
  carbs: number;
};
