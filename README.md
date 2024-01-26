# Dockerized NestJS-Prisma Sample App

Hello there! This is just a sample nestjs app contains two table author and book and uses mongodb via Prisma

## Installation

Follow these steps to get your development environment set up:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ibayazit/dockerized-nestjs-sample-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd dockerized-nestjs-sample-app
   ```

3. **Install dependencies & Generate prisma:**

   ```bash
   npm install
   npm run prisma:gen
   ```

4. **Configuration:**

   ```bash
   cp .env.example .env
   cp .env.development.example env.development
   cp .env.production.example .env.production // Actually you don\'t need it there is no production setup
   cp .env.test.example .env.test
   ```

5. **Run the application on docker:**

   Generate keyfile for mongodb replicas

   ```bash
   openssl rand -base64 741 > .docker/mongo/keyfile
   chmod 600 .docker/mongo/keyfile
   ```

   Up docker-compose
   main service is connected to project with volume. So if you make any update you can see it without another docker-compose up

   ```bash
   docker-compose up
   // if you made any environment or anything else except code update run the code below
   docker-compose up SERVICE_NAME --build -V -d
   ```

6. **Import postman collection:**
   BookApp.postman_collection.json

## Testing

```bash
npm run test.e2e
```

**Happy Coding!** 🚀
