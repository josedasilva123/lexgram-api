FROM node

WORKDIR /srv/app

COPY package.json .

RUN npm install

COPY . . /srv/app/

RUN npm run build

EXPOSE 3030

CMD ["node", "build/index.js"]