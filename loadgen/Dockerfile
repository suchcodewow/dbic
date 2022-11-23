FROM mcr.microsoft.com/playwright

# WORKDIR /app

RUN npm install -g artillery artillery-engine-playwright @playwright/test && \
    npm cache clean --force && \
    rm -rf /root/.cache && \
    rm -rf /ms-playwright/firefox* && \
    rm -rf /ms-playwright/webkit*

COPY dbicLoadgen.yaml .
COPY artillery.js .
ENV  NODE_PATH /usr/lib/node_modules

ENTRYPOINT ["/usr/bin/artillery","run", "dbicLoadgen.yaml"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]