# Vercel の環境変数設定

- TIC_TAC_TOE_URL: ○×ゲームへの遷移用URL
- LOGIN_USER: ログインユーザID
- LOGIN_PASSWORD: ログインパスワード。下記コマンドでハッシュ化した値を設定

```
sha256sum a.txt
```
# ログイン画面仕様

ChatGPTで下記のように返ってきたのでこれを参考に作成予定。

- [] トークンを生成（シンプルな実装のため、実際のアプリケーションではJWTなどを使用） の部分は要調査

Vercel上でIDとパスワードを管理し、ログイン機能を実装するためには、Node.jsとNext.jsのApp Routerを使用して認証システムを構築することができます。この方法では、Vercelのサーバーレスファンクションと環境変数を活用します。以下に、基本的な手順を示します。

### 基本的な手順

#### 1. 環境変数の設定

Vercelのダッシュボードで、固定のIDとパスワードを環境変数として設定します。

1. **Vercelのダッシュボード**にアクセス。
2. 対象プロジェクトの「Settings」タブを開き、「Environment Variables」を選択。
3. `LOGIN_USER` と `LOGIN_PASSWORD` の環境変数を追加し、それぞれの値を設定します。

#### 2. 認証用サーバーレスファンクションの作成

`app/api/auth/login.js` に以下のようなサーバーレスファンクションを作成します。

```javascript
// app/api/auth/login.js
export default function handler(req, res) {
  const { username, password } = req.body;

  if (username === process.env.LOGIN_USER && password === process.env.LOGIN_PASSWORD) {
    // トークンを生成（シンプルな実装のため、実際のアプリケーションではJWTなどを使用）
    res.status(200).json({ token: 'authenticated' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
```

#### 3. ログインページの作成

`app/login/page.js` にログインページを作成します。

```javascript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('authToken', data.token);
      router.push('/');
    } else {
      setError(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
```

#### 4. 認証ガードの作成

特定のページにアクセス制限をかけるための認証ガードを作成します。`app/protected/page.js` で以下のようにします。

```javascript
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedPage = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token === 'authenticated') {
      setAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!authenticated) {
    return <p>Loading...</p>;
  }

  return <div>This is a protected page.</div>;
};

export default ProtectedPage;
```

### まとめ

1. **環境変数**をVercelのダッシュボードで設定します。
2. **認証用サーバーレスファンクション**を作成し、ユーザー認証を行います。
3. **ログインページ**を作成し、ユーザーがIDとパスワードを入力できるようにします。
4. **認証ガード**を設定し、ログインしていないユーザーが特定のページにアクセスできないようにします。

この方法により、Vercel上でIDとパスワードによる認証機能を実装できます。必要に応じて、JWTなどのトークンベースの認証方式に切り替えることで、セキュリティを強化することもできます。