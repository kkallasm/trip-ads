FROM node:20

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8888

CMD ["npm", "run", "start"]
#CMD [ "node", "build/app.js" ]