FROM openjdk:23
COPY target/users-springboot-*.jar users-springboot.jar
HEALTHCHECK --interval=1m --timeout=5s --start-period=15s --retries=3 \
  CMD curl --fail --silent localhost:8080/actuator/health | jq --exit-status -n 'inputs | if has(\"status\") then .status==\"UP\" else false end' > /dev/null || exit 1
EXPOSE 8080:8080
ENTRYPOINT ["java", "-jar", "users-springboot.jar"]
