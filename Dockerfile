FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install
RUN npm install react-scripts@5.0.0 -g

COPY . ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN npm run build

# COPY --from=build /app/build /bin/www

CMD ["npm", "start"]