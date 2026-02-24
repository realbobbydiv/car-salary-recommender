using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger (dev only)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS (allow Vite dev server on localhost:5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalDev", policy =>
        policy
            .WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

// Swagger UI in Development only
if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Only enable HTTPS redirection when NOT in Development.
// This ensures local HTTP requests from Vite (http://localhost:5173) are not redirected.
if (!builder.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Routing then CORS then endpoints
app.UseRouting();

app.UseCors("AllowLocalDev");

app.UseAuthorization();

app.MapControllers();

app.Run();