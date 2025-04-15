using Microsoft.EntityFrameworkCore;
using server.Configurations;
using server.Data;
using server.Interface;
using server.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("MBSConnectionString");
builder.Services.AddDbContext<MBSDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        b => b.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

builder.Services.AddAutoMapper(typeof(MapperConfig)); // Register AutoMapper
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>)); // Register Generic Repository
builder.Services.AddScoped<IMoviesRepository, MoviesRepository>(); // Register Movies Repository
builder.Services.AddScoped<IShowsRepostory, ShowsRepository>(); // Register Shows Repository
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
