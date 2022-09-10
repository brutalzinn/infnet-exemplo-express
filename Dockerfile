FROM node:16

WORKDIR /the/workdir/path

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD npm start
