package dev.shiperist.exception;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.hibernate.exception.ConstraintViolationException;

@Provider
public class HibernateExceptionHandler implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException e) {
        if (e.getConstraintName().contains("email")) {
            return Response.status(Response.Status.BAD_REQUEST).entity(ErrorMessage.EMAIL_ALREADY_EXISTS).build();
        }

        if (e.getConstraintName().contains("project_name_key")) {
            return Response.status(Response.Status.BAD_REQUEST).entity(ErrorMessage.PROJECT_ALREADY_EXISTS).build();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
