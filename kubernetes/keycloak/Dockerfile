FROM quay.io/keycloak/keycloak:latest

COPY ./realm-export.json /data/import/realm-export.json

ENTRYPOINT [ "start-dev", "--import-realm" ]
