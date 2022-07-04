FROM node:18-alpine AS builder

ENV DEBUG expresso:*

WORKDIR /app
COPY ["./package.json", "./package-lock.json", "/app/"]
COPY ["./src", "./tsconfig.json", "/app/"]

RUN npm i
RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder ["/app/package.json", "/app/package-lock.json", "/app/"]
COPY --from=builder ["/app/dist", "/app/dist/"]

RUN npm i --omit=dev
ENTRYPOINT [ "npm", "start" ]
