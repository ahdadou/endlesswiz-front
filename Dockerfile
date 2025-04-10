FROM node:18-alpine
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# Expose the port the app runs on
EXPOSE 3200
# Define the command to run the app
CMD npm run start

# CMD [ "npm", "start" ]
# Build the Docker image
# docker build -t my-node-app .
# Run the Docker container
# docker run -p 3000:3000 my-node-app
# To run the container in detached mode
# docker run -d -p 3000:3000 my-node-app