const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// DB 연결 정보
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// MySQL 연결
const connection = mysql.createConnection(dbConfig);

// DB 연결 테스트
connection.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err);
    return;
  }
  console.log('DB 연결 성공');
});

// Body-parser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 로그인 API 엔드포인트
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // DB에서 유저 정보 조회
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('쿼리 실행 실패:', err);
      res.status(500).json({ error: '서버 오류' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: '인증 실패' });
    } else {
      res.json({ message: '인증 성공' });
    }
  });
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
