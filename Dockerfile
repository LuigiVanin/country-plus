FROM cypress/browsers

WORKDIR /usr/app

ENV LOCAL_WEBPAGE_URL=http://localhost:3000

COPY package.json .

RUN npm i -g pnpm
RUN pnpm install

COPY . .

CMD ["pnpm", "run", "cy:ci:run"]