FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY mvnw pom.xml ./
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B
COPY src ./src
RUN ./mvnw package -DskipTests
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# Docker image building instructions
# Dont edit
