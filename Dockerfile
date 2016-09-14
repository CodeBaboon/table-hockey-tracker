FROM node:4.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm install --production
COPY . /usr/src/app/

ENV PORT 80
EXPOSE 80

ENTRYPOINT ["npm", "run", "start"]