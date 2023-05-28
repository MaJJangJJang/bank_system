const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World 23.05.28 21:47!');
});

app.listen(3000, () => {
  console.log('서버가 3000 port에서 실행 중입니다.');
});
