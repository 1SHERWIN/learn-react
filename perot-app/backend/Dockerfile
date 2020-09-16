FROM maven
WORKDIR /java
COPY . /java
RUN mvn package
ENTRYPOINT ["java","-jar","/java/target/perotMuseumScavengerHunt-0.0.1-SNAPSHOT.jar"]