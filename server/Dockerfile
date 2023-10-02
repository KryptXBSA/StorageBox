FROM golang:1.21.1

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY . .

# Build
# RUN go run github.com/steebchen/prisma-client-go db push
# RUN CGO_ENABLED=0 GOOS=linux go build -o /main

# ENV JWT_SECRET=your-secret-key
# ENV DATABASE_URL=postgresql://postgres:123@sbp:5432/tus
# ENV REDIS_URL=redis://sbr:6379/0

EXPOSE 4000
COPY build-and-run.sh /app/build-and-run.sh
RUN chmod +x /app/build-and-run.sh
ENTRYPOINT ["/app/build-and-run.sh"]
