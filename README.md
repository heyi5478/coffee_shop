# 泡咖啡電商網站
![首頁PC及手機板](https://i.imgur.com/pOMZ5HL.png)


## 專案說明
> Demo Website :https://heyi5478.github.io/coffee_shop/

以賣咖啡為主題的電商網站。

旅遊文案及圖片來源：
[UnSplash](https://unsplash.com/)、
[Pexels](https://www.pexels.com/zh-tw/)、

## 使用技術
- 以 Vue 3 與 Vue Cli 架設開發
- 使用 Bootstrap 5 作為 CSS 框架，以進行切版
- 加入 ESLint airbnb 統一程式碼結構
- render伺服器

## 使用套件
- Vue 3
- Vue Cli
- Vue Router
- Vue Axios
- vue-loading-overlay
- vue-skeletor
- Vee Validation
- Bootstrap 5
- bootstrap5 icon
- Swiper
- jquery
- axios 
- sweetalert2
- pinia
- CKEditor

## 前台簡介
### 首頁
![首頁](https://i.imgur.com/pOMZ5HL.png)


### 線上商店
![線上商店](https://i.imgur.com/WrAOqnR.png)

### 商品內容
![商品內容](https://i.imgur.com/NB4E7HI.png)

### 管理員登入
![管理員登入](https://github.com/GinaTung/2024-southerntravelwebsite-fin/assets/88545191/c1576e0e-5828-4602-9a65-cdba8d2b4a37)

### 購物車
![購物車](https://i.imgur.com/IFmnnoD.png)


## 後台簡介
### 訂單管理
![image](https://i.imgur.com/ZOzKrEk.png)

# 2024-southerntravelwebsite-fin
This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Environment Variables Setup

1. 複製環境變數範本文件：
```sh
cp .env.example .env
```

2. 編輯 `.env` 文件，填入正確的 API 配置：
```bash
# API 配置
VITE_URL=https://your-api-domain.com/v2
VITE_PATH=your-api-path

# 儲存庫名稱
REPOSITORY_NAME=your-repo-name
```

**注意**: `.env` 文件包含敏感資訊，請勿提交到版本控制系統。

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 開發順序

- 1. 切版完成
- 2. 把板套用在 vue 環境
--    1.先把路由開好
---     1.建立檔案
---     2.路由表
---     3.路徑連結
--    2.sass 引入(bootstrap)
--    3.主板套用完成    
- 3. 先串接主要功能 產品列表 單一產品頁 購物車 結帳頁
--    1.產品列表
--    2.單一產品
--    3.加入購物車
--    4.Category 分類功能  
--    5.購物車頁面
--    6.結帳表單頁面
- 4. 畫面特效
- 5. 修飾
