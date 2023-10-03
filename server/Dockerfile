FROM golang:1.21.1

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 4000

COPY build-and-run.sh /app/build-and-run.sh
RUN chmod +x /app/build-and-run.sh

ENTRYPOINT ["/app/build-and-run.sh"]
