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

# Set environment variable for API URL
ENV REACT_APP_API_URL=http://backend:3001/api

# Build the React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to run the frontend
CMD ["serve", "-s", "build"]