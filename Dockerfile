# Stage 1: Build the frontend
FROM oven/bun:1 as frontend-builder

# Set working directory
WORKDIR /app

# Copy package files
COPY client/package.json client/bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY client .

# Build the application
RUN bun run build

# Stage 2: Build the backend
FROM eclipse-temurin:21-jdk-jammy as backend-builder

WORKDIR /app

COPY server .
COPY --from=frontend-builder /app/dist ./src/main/resources/static

RUN chmod +x ./mvnw
RUN ./mvnw clean package spring-boot:repackage

# Stage 3: Production image
FROM eclipse-temurin:21-jre-jammy as runner

WORKDIR /app

# Copy built artifacts from previous stages
COPY --from=backend-builder /app/target/*.jar /app/app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
