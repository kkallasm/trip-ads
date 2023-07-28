FROM node:20

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8888

CMD ["npm", "run", "start"]