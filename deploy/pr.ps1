# docker compose -f docker-compose.yml -f compose.dev.yml up -d --build $args[0]
docker compose -f docker-compose.yml up -d --build $args[0]