package dev.shiperist.exception;

import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class NotFoundExceptionHandler implements ExceptionMapper<NotFoundException> {

    @Override
    public Response toResponse(NotFoundException e) {
        if (e.getMessage().contains("Refresh token not found")) {
            return Response.status(Response.Status.BAD_REQUEST).entity(ErrorMessage.INVALID_REFRESH_TOKEN).build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
