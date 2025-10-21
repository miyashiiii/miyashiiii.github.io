# miyashiiii.github.io

## セットアップ

### 環境変数の設定

`.env` ファイルを作成し、Supabaseの接続情報を設定します。

```bash
cp .env.example .env
```

`.env` ファイルを編集して、以下の値を設定してください：

```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
```

### 依存パッケージのインストール

```bash
npm install
```

## ローカルサーバー起動

```bash
npm run dev
```

サーバーが起動したら、http://localhost:3001 にアクセスしてください。

## バックエンドAPI

### エンドポイント

- `GET /api/posts` - 記事一覧取得
  - クエリパラメータ: `tag` (オプション) - タグでフィルタリング
  - 例: `/api/posts?tag=Python`

### 動作確認方法

#### 1. 記事一覧の取得

```bash
curl http://localhost:3001/api/posts
```

記事データがJSON形式で返されます。

#### 2. タグでフィルタリング

```bash
curl "http://localhost:3001/api/posts?tag=Python"
```

Pythonタグが付いた記事のみが返されます。

#### 3. ブラウザでの確認

- 記事一覧ページ: http://localhost:3001/posts
- タグフィルタリング: http://localhost:3001/posts?tag=Python
- タグをクリックすると、そのタグの記事のみが表示されます

## データベース

### Supabaseへのデータ移行

初回セットアップ時、または posts.json を更新した後に実行：

```bash
SUPABASE_URL=your-url SUPABASE_KEY=your-key npm run migrate
```

### データベーススキーマ

スキーマ定義は [database/schema.sql](database/schema.sql) を参照してください。

## 記事追加

現在は [assets/posts.json](assets/posts.json) を更新後、マイグレーションスクリプトを実行してSupabaseに反映します。

テンプレ:

```json
  {
    "title": "",
    "url": "",
    "date": "2024/00/00",
    "tags": []
  },
```

## テスト

### JSON ファイル形式チェック

```bash
npm run test
```

### E2Eテスト

```bash
npm run e2e
```

## 画面

- トップページ
  - 各 SNS リンク
- 記事一覧ページ
  - 各ブログサイトへ投稿した記事の紹介
  - タグによるフィルタリング機能
- 成果物一覧ページ
  - リリースしたアプリやサービスの紹介
