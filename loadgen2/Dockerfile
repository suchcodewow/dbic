FROM ubuntu:focal

COPY . /e2e

WORKDIR /e2e

# Install node16
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npx playwright install --with-deps chromium

# Run playwright test
ENTRYPOINT ["sh", "/e2e/start.sh"] 