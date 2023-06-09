FROM bitnami/keycloak:latest

COPY ./keycloak/quarkus-realm.json /opt/keycloak/data/import/quarkus-realm.json

ENTRYPOINT [ "/opt/bitnami/scripts/keycloak/entrypoint.sh" ]
CMD [ "/opt/bitnami/scripts/keycloak/run.sh", "start-dev", "--import-realm" ]
