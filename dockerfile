# Base image
FROM node:18

# Create app directory
WORKDIR /app  

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Build the TypeScript files (if using TypeScript)
RUN npm run build 

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "dist/app.js"] 
