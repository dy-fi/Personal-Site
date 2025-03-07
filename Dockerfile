FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json . 
RUN npm install
RUN npm audit fix
COPY . .
ENV NODE_ENV=production
// EXPOSE 5000
CMD [ "node", "app.js" ]
