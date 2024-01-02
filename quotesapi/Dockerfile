# Dockerfile.production

FROM alpine:3.16 as builder
RUN apk add --no-cache go gcc g++
ENV APP_HOME /go/src/app

WORKDIR "$APP_HOME"
COPY . .

RUN go mod download
RUN go mod verify
RUN CGO_ENABLED=1 GOOS=linux go build -ldflags '-linkmode=external' -o quotesapi

COPY prod.env $APP_HOME/.env

EXPOSE 6000
CMD ["./quotesapi"]