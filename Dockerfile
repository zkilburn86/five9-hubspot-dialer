FROM node:16.5.0

WORKDIR /app
COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["node", "./server/dist/index.js"]