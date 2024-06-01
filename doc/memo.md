# VSCode の ESLint のエラー解決方法

## Parsing error: Cannot find module 'next/babel'

```
  1 {
  2   "extends": "next/core-web-vitals"
  3 }
```

↓に変更したら エラーが消えた

```
  1 {
  2   "extends": ["next", "next/core-web-vitals", "prettier"]
  3 }
```
