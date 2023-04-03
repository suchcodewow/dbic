# Dockerfile.production

FROM alpine:3.16 as builder
RUN apk add --no-cache go gcc g++
ENV APP_HOME /go/src/app

WORKDIR "$APP_HOME"
COPY . .

RUN go mod download
RUN go mod verify
RUN CGO_ENABLED=1 GOOS=linux go build -ldflags '-linkmode=external' -o quotesapi

#FROM alpine:3.16
#ENV APP_HOME /go/src/app
#RUN mkdir -p "$APP_HOME"
#WORKDIR "$APP_HOME"
#COPY --from=builder "$APP_HOME"/app $APP_HOME

COPY prod.env $APP_HOME/.env

EXPOSE 6000
CMD ["./quoteapi"]