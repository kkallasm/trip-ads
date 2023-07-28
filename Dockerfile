FROM node:20

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 8888

CMD ["npm", "run", "start"]