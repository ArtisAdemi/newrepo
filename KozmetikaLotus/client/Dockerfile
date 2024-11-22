# Use the official Node.js 16 image as the base image
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# Update browserslist database
RUN npx update-browserslist-db@latest

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to run the frontend
CMD ["serve", "-s", "build"]
