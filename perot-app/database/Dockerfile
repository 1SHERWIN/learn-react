FROM mysql

ENV MYSQL_ROOT_PASSWORD=perot
ENV MYSQL_DATABASE=perot_museum

COPY ./sqlScripts /docker-entrypoint-initdb.d/
COPY ./docker.cnf /etc/mysql/conf.d/docker.cnf
