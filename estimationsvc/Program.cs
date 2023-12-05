using Microsoft.AspNetCore.HttpLogging;
var builder = WebApplication.CreateBuilder(args);

// Add app services
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpLogging(logging =>
{
    // logging.LoggingFields = HttpLoggingFields.All
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
});

// Add app options
var app = builder.Build();
app.UseCors((builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
}));
app.UseHttpLogging();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Urls.Add("http://*:5130");
app.Run();