FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app
RUN npm install -g nodemon

COPY package.json package-lock.json ./
#RUN npm install --production
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start.dev" ]