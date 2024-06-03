// app/api/auth/login.js
export default function handler(req, res) {
  const { username, password } = req.body;

  if (username === process.env.LOGIN_USER && password === process.env.LOGIN_PASSWORD) {
    //TODO トークンを生成（シンプルな実装のため、実際のアプリケーションではJWTなどを使用）
    res.status(200).json({ token: 'authenticated' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

