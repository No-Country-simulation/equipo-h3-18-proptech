using h3_18_proptechback.Identity;
using h3_18_proptechback.Infrastructure;
using h3_18_proptechback.Application;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureIdentityServices(builder.Configuration);
builder.Services.AddApplicationInfrastructureServicesExtensions(builder.Configuration);
builder.Services.AddAplicationService();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
});

var apiUrl = builder.Configuration.GetValue<string>("apiUrl");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(apiUrl) });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//no borrar para que el front pueda ver el Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();