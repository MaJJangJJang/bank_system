const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // MySQL 호스트
  user: process.env.DB_USER, // MySQL 사용자 이름
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_DATABASE // 사용할 데이터베이스 이름
});

// 로그인 라우트 핸들러
app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('로그인 오류:', error);
      res.json({ success: false });
    } else {
      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 3000번 port에서 실행 중입니다.');
});
