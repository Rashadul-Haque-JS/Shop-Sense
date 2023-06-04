# Use the official Node.js Docker image as the base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Copy the production build files
COPY .next ./.next

# Expose the default Next.js port (assuming it's 3000)
EXPOSE 3000

# Set the startup command
CMD ["npm", "start"]

