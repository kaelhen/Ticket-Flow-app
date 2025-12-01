FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod ./
COPY . .
RUN go mod tidy
RUN go build -o queue-service .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/queue-service .
EXPOSE 8082
CMD ["./queue-service"]