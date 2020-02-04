FROM node as builder
WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node
WORKDIR /hope/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /home/app/dist ./dist

COPY /src/config/ormconfig.docker.ts ./dist/config/orm.config.json
COPY .env .

EXPOSE 4000
CMD node dist/src/server.js