# nuto-frontend/Dockerfile
FROM nginx:alpine

# React build 결과물을 nginx가 서비스할 경로로 복사
COPY build /usr/share/nginx/html

# nginx가 listen할 포트
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
