FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # Ensure the build step runs
EXPOSE 3200
CMD ["npm", "start", "--", "-p", "3200"]