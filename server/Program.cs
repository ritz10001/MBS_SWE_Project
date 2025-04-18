using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Configurations;
using server.Data;
using server.Interface;
using server.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("MBSConnectionString");
builder.Services.AddDbContext<MBSDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentityCore<User>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<MBSDbContext>();

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
builder.Services.AddScoped<ITheatresRepository, TheatresRepository>(); // Register Theatres Repository
builder.Services.AddScoped<IReviewsRepository, ReviewsRepository>(); // Register Reviews Repository
builder.Services.AddScoped<IAuthService, AuthService>(); // Register Auth Service

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])) 
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
