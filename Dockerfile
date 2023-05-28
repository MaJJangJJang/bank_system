# Frontend 빌드 단계
FROM node:14 as frontend

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend .

# Backend 빌드 단계
FROM node:14 as backend

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend .

# 포트 노출 및 실행
EXPOSE 3000

CMD ["npm", "start"]