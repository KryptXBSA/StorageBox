# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install project dependencies
RUN npm i -g pnpm
RUN pnpm install


# Build your Next.js app
RUN pnpm build

# Expose the port that your Next.js app will run on
EXPOSE 4001

# Define the command to run your Next.js app
CMD ["pnpm", "start"]
