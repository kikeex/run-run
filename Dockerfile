FROM node:9

COPY package.json /run-run/

WORKDIR /run-run

RUN npm install

ADD . /run-run

EXPOSE 3000

CMD [ "npm", "run", "start"]
