package com.nillo.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.OAuthFlow;
import io.swagger.v3.oas.annotations.security.OAuthFlows;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Danillo",
                        email = "danillo@test.be",
                        url = "https://some-url.com"
                ),
                description = "OpenApi documentation for Spring Security",
                title = "OpenApi specification",
                version = "1.0",
                license = @License(
                        name = "Licence name",
                        url = "https://some-url.com"
                ),
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://127.0.0.1:8080/api/v1"
                ),
                @Server(
                        description = "Local PROD",
                        url = "http://127.0.0.1:8080/api/v1"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "Bearer Authentication"
                )
        }
)
@SecurityScheme(
        name = "Bearer Authentication",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.OAUTH2,
        flows = @OAuthFlows(
                implicit =  @OAuthFlow(
                        authorizationUrl = "http://localhost:9090/realms/book-social-network/protocol/openid-connect/auth"
                )
//                ,
//                clientCredentials =
//                @OAuthFlow(
//                        authorizationUrl = "http://localhost:9090/realms/book-social-network/protocol/openid-connect/auth"
//                )
        ),
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
