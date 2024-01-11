using apiDomino.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API Campeonato de dominó", Version = "v1" });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());

//Configura CORS
builder.Services.AddCors(o => o.AddPolicy("Domino", builder =>
{
    builder.WithOrigins("http://localhost:5173")
    .WithMethods("POST", "GET", "PUT", "DELETE")
    .WithHeaders(HeaderNames.ContentType);
}));

builder.Services.AddControllers();

var app = builder.Build();

// Create a scope to resolve the ApplicationDbContext and apply pending migrations
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API de Jogadores V1");
    });
}

app.UseHttpsRedirection();
app.UseCors("Domino");
app.UseRouting();

app.UseAuthorization();
app.MapControllers();

app.Run();
