# Dockerfile.production

FROM registry.semaphoreci.com/golang:1.18 as builder

ENV APP_HOME /go/src/app

WORKDIR "$APP_HOME"
COPY . .

RUN go mod download
RUN go mod verify
RUN go build -o app

FROM registry.semaphoreci.com/golang:1.18

ENV APP_HOME /go/src/app
RUN mkdir -p "$APP_HOME"
WORKDIR "$APP_HOME"

# COPY src/conf/ conf/
# COPY src/views/ views/
COPY --from=builder "$APP_HOME"/app $APP_HOME
COPY prod.env $APP_HOME/.env

EXPOSE 80
CMD ["./app"]