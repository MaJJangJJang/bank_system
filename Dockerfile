# 베이스 이미지 선택
FROM node:14

# 앱 디렉토리 생성
WORKDIR /app

# 앱 종속성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# 앱 실행
CMD [ "node", "index.js" ]
