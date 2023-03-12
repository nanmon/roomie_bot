# image
FROM node:18
# litefs setup
COPY --from=flyio/litefs:0.3 /usr/local/bin/litefs /usr/local/bin/litefs
ADD litefs.yml /etc/litefs.yml
RUN apt-get update
RUN apt-get install -y fuse sqlite3
# source code directory
WORKDIR /app
# copy package info
COPY package*.json ./
# install
RUN npm ci --only=production
# copy source code
COPY . .
# RUN litefs import -name db.sqlite /app/db.sqlite
ENTRYPOINT litefs mount -- node index.js
