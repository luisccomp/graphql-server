# syntax=docker/dockerfile:1

# Build stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod .
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# Run stage
FROM scratch
WORKDIR /app
COPY --from=builder /app/server ./
EXPOSE 8080
ENTRYPOINT ["./server"]
