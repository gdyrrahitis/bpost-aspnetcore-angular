namespace Authentication.Server.Web
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;
    using System.Security.Claims;
    using IdentityServer4.Models;
    using IdentityServer4.Test;
    using Microsoft.IdentityModel.Protocols.OpenIdConnect;

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryApiResources(new List<ApiResource>
                {
                    new ApiResource("resource.server.api")
                })
                .AddInMemoryClients(new List<Client>
                {
                    new Client
                    {
                        ClientId = "angular.client",
                        ClientName = "Angular Client",
                        ClientSecrets = new [] { new Secret("secret".Sha256())  },
                        AllowedScopes = new [] { "resource.server.api" },
                        AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                        AllowedCorsOrigins = new [] { "http://localhost:4200/" }
                    }
                })
                .AddTestUsers(new List<TestUser>
                {
                    new TestUser
                    {
                        SubjectId = "1",
                        Username = "user",
                        Password = "1234",
                        Claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Email, "email@mail.com")
                        }
                    }
                });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseIdentityServer();
        }
    }
}
