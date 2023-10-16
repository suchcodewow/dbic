FROM node:19.0.0-bullseye-slim
COPY . /e2e
WORKDIR /e2e
RUN npm install && npx playwright install --with-deps chromium
ENTRYPOINT ["node", "test.js"] 