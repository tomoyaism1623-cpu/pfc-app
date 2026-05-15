# PFCバランス ごはん提案アプリ

筋トレに取り組む人向けに、**コンビニ・ファストフードのメニューから目標PFCに近いものを提案**するWebアプリです。

- 公開URLで誰でも使える（ログイン不要）
- ブラウザだけで動く（スマホ・PC両対応）
- 商品データは月1回、Claude Code の Routines（スケジュールタスク）で自動更新する予定

---

## 今できること（Step 1 完了時点）

- 店舗（セブン-イレブン / マクドナルド / 松屋）を選んで
- 目標PFC（プリセット：増量・維持・減量、もしくは自由入力）を指定すると
- 目標に近い順にメニューが並ぶ

**注意：現在のデータは「ダミー」です。** 実運用前に最新の栄養成分で `data/*.json` を更新してください。

---

## 動かし方

### 必要なもの
- Node.js（バージョン 20 以上）

入っているかは以下で確認：
```bash
node --version
```

入っていない場合は Homebrew で：
```bash
brew install node
```

### 開発サーバーの起動
```bash
cd pfc-app
npm install   # 初回のみ
npm run dev
```

ブラウザで `http://localhost:3000` を開く。

### 本番ビルド（公開する前の確認）
```bash
npm run build
npm run start
```

---

## ファイル構成（重要なもの）

```
pfc-app/
├── app/
│   ├── page.tsx              # トップページ（店舗選択）
│   ├── [store]/page.tsx      # 店舗別ページ（メニュー一覧＋PFC入力）
│   └── layout.tsx            # 全ページ共通の枠
├── components/
│   ├── PFCInput.tsx          # 目標PFCの入力フォーム
│   └── MenuCard.tsx          # メニュー1件のカード
├── lib/
│   ├── types.ts              # データの型定義
│   ├── stores.ts             # 店舗一覧とデータ読み込み
│   └── score.ts              # 距離計算ロジック・プリセット定義
└── data/                     # ★商品データ（ここを更新する）
    ├── seven.json
    ├── mcdonalds.json
    └── matsuya.json
```

---

## 商品データを手動で直したいとき

`data/<店舗名>.json` を編集します。各メニューは以下の形式：

```json
{
  "id": "seven-001",
  "name": "サラダチキン（プレーン）",
  "category": "惣菜",
  "protein": 25.0,
  "fat": 1.5,
  "carbs": 1.0,
  "calories": 113,
  "price": 268
}
```

- `protein` / `fat` / `carbs` の単位は **グラム（g）**
- `calories` の単位は **kcal**
- `price` は税込価格（省略可）

編集してファイルを保存すると、開発サーバー実行中なら即座にブラウザに反映されます。

---

## 新しい店舗を追加するには

1. `data/<新店舗名>.json` を作成（既存ファイルをコピーして書き換えるのが楽）
2. `lib/stores.ts` の `STORES` 配列と `STORE_DATA` に新店舗を追加

---

## 次のステップ（実装予定）

- **Step 2**: Vercel に公開して、公開URL を取得
- **Step 3**: Routines（月1回の自動データ更新）の動作検証
- **Step 4**: Claude in Chrome 経由で各社サイトから栄養成分を取得 → JSON自動更新
- **Step 5**: ローソン・ファミマ・すき家 を追加
- **Step 6**: 「2品組み合わせ」提案機能の追加

詳しい全体計画は `/Users/tomoyakaji/.claude/plans/pfc-wobbly-lake.md` を参照。

---

## トラブル時の対処

**症状：** `npm run dev` でエラーが出る
**対処：** `node_modules` フォルダを削除して `npm install` をやり直す

**症状：** ブラウザに古いデータが表示される
**対処：** ブラウザを強制リロード（Mac: ⌘+Shift+R）

**症状：** Routines（自動更新）が失敗した
**対処：** Claude Code に「先月のRoutine、失敗してたから原因を調べて直して」と頼む
