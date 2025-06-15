FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies) for building
RUN npm ci

COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["npm", "start"]