using h3_18_proptechback.Identity;
using h3_18_proptechback.Infrastructure;
using h3_18_proptechback.Application;
using h3_18_proptechback.CreditRecord;
using h3_18_proptechback.Cloudinary;
using h3_18_proptechback.MercadoPago;
using h3_18_proptechback.API;
using h3_18_proptechback.DolarAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();

builder.Services.ConfigureIdentityServices(builder.Configuration);
builder.Services.AddApplicationInfrastructureServicesExtensions(builder.Configuration);
builder.Services.AddAplicationService();
builder.Services.RecordCreditServices(builder.Configuration);
builder.Services.AddCloudinaryServicesExtensions(builder.Configuration);
builder.Services.AddMercadoPagoServicesExtensions(builder.Configuration);
builder.Services.AddDolarAPIServicesExtensions(builder.Configuration);



builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
});



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
