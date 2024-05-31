# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the shared library from the parent directory
COPY ../shared/package.json ../shared/package-lock.json ./shared/

# Install the project dependencies including the shared library
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

COPY ../shared ./shared

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
