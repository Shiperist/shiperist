package dev.shiperist.exception;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ErrorMessageHandler implements ExceptionMapper<ErrorMessageException> {
    @Override
    public Response toResponse(ErrorMessageException e) {
        return Response.status(Response.Status.BAD_REQUEST).entity(e.getErrorMessage()).build();
    }
}
