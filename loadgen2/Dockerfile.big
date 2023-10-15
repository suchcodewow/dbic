FROM mcr.microsoft.com/playwright:v1.39.0-jammy
COPY . /e2e

WORKDIR /e2e

RUN npm install && npx playwright install --with-deps chromium

# Run playwright test
ENTRYPOINT ["sh", "/e2e/start.sh"] 