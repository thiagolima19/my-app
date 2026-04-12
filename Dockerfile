# ---- Build Stage ----
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine

WORKDIR /app

# Install serve to host the built React app
RUN npm install -g serve

# Copy built output from build stage
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
