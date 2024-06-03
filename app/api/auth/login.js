// app/api/auth/login.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (username === process.env.LOGIN_USER && password === process.env.LOGIN_PASSWORD) {
    // トークンを生成（シンプルな実装のため、実際のアプリケーションではJWTなどを使用）
    res.status(200).json({ token: 'authenticated' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
