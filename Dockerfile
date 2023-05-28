# 프론트엔드 애플리케이션을 빌드합니다.
FROM node:14 as frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# 백엔드 애플리케이션을 빌드합니다.
FROM node:14 as backend-builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend .

# 프론트엔드와 백엔드를 결합한 최종 이미지를 생성합니다.
FROM node:14
WORKDIR /app
COPY --from=frontend-builder /app/build ./frontend
COPY --from=backend-builder /app ./

EXPOSE 3000
CMD [ "node", "server.js" ]
