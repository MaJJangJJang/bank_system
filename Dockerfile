# Node.js 이미지 사용
FROM node:14

# 앱 디렉토리 생성
WORKDIR /app

# 앱 종속성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# 컨테이너 시작 시 실행할 명령
CMD ["node", "server.js"]
