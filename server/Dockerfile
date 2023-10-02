# syntax=docker/dockerfile:1

FROM golang:1.21.1

# Set destination for COPY
WORKDIR /app

# Install netcat (nc) to support the wait-for.sh script
RUN apt-get update && apt-get install -y netcat

# Download Go modules
COPY . .

# Define the wait-for.sh script and make it executable
COPY wait-for.sh /app/wait-for.sh
RUN chmod +x /app/wait-for.sh

# Use the wait-for.sh script to wait for PostgreSQL and Redis
RUN /app/wait-for.sh sbp 5432 && /app/wait-for.sh sbr 6379

# Build
RUN go run github.com/steebchen/prisma-client-go db push
RUN CGO_ENABLED=0 GOOS=linux go build -o /main

ENV JWT_SECRET=your-secret-key
ENV DATABASE_URL=postgresql://postgres:123@sbp:5432/tus
ENV REDIS_URL=redis://sbr:6379/0

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/engine/reference/builder/#expose
EXPOSE 4000

# Use the wait-for.sh script as the entry point to wait for PostgreSQL and Redis
# before running the main application.
ENTRYPOINT ["/app/wait-for.sh", "sbp", "5432", "/app/main"]
