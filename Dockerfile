FROM node:12.13.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

CMD npm run server