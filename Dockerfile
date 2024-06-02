FROM cypress/browsers

WORKDIR /usr/app

COPY package.json .

RUN npm i -g pnpm
RUN pnpm install

COPY . .

CMD ["npm", "run", "cy:ci:run"]