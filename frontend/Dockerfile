
FROM node:20.12.2
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]