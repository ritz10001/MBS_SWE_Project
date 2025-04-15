using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class SeededMoviesAndTheatresAndShowsAndReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "Id", "Cast", "Description", "Director", "Duration", "Genre", "ImageUrl", "Rating", "ReleaseDate", "Title", "isActive" },
                values: new object[,]
                {
                    { 1, "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page", "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.", "Christopher Nolan", 148, "Sci-Fi", "https://example.com/inception.jpg", 8.8f, new DateTime(2010, 7, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "Inception", true },
                    { 2, "Christian Bale, Heath Ledger, Aaron Eckhart", "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.", "Christopher Nolan", 152, "Action", "https://example.com/dark_knight.jpg", 9f, new DateTime(2008, 7, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "The Dark Knight", true },
                    { 3, "Matthew McConaughey, Anne Hathaway, Jessica Chastain", "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", "Christopher Nolan", 169, "Adventure", "https://example.com/interstellar.jpg", 8.6f, new DateTime(2014, 11, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Interstellar", true },
                    { 4, "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss", "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", "Lana Wachowski, Lilly Wachowski", 136, "Action", "https://example.com/matrix.jpg", 8.7f, new DateTime(1999, 3, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "The Matrix", true }
                });

            migrationBuilder.InsertData(
                table: "Theatres",
                columns: new[] { "Id", "Location", "Name" },
                values: new object[,]
                {
                    { 1, "Lubbock", "Cineplex 1" },
                    { 2, "Amarillo", "Cineplex 2" },
                    { 3, "Levelland", "Cineplex 3" },
                    { 4, "Plainview", "Cineplex 4" },
                    { 5, "Snyder", "Cineplex 6" },
                    { 6, "Abilene", "Cineplex 6" }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Id", "Comment", "MovieId", "Rating", "ReviewDate" },
                values: new object[,]
                {
                    { 1, "Amazing movie!", 1, 5f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "Great action scenes.", 2, 4f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "Mind-blowing!", 3, 5f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "A classic!", 4, 5f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, "Great concept.", 1, 4f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, "Best movie of the year.", 2, 5f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, "Very interesting plot.", 3, 4f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 8, "Loved it!", 4, 5f, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Shows",
                columns: new[] { "Id", "MovieId", "ShowTime", "TheatreId", "TicketPrice", "isActive" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 4, 14, 12, 0, 0, 0, DateTimeKind.Unspecified), 1, 22.00m, true },
                    { 2, 2, new DateTime(2025, 4, 14, 15, 0, 0, 0, DateTimeKind.Unspecified), 2, 22.00m, true },
                    { 3, 3, new DateTime(2025, 4, 14, 18, 0, 0, 0, DateTimeKind.Unspecified), 3, 20.00m, true },
                    { 4, 4, new DateTime(2024, 4, 14, 21, 0, 0, 0, DateTimeKind.Unspecified), 4, 25.00m, true },
                    { 5, 1, new DateTime(2024, 4, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), 5, 30.00m, true },
                    { 6, 2, new DateTime(2024, 4, 15, 15, 0, 0, 0, DateTimeKind.Unspecified), 6, 18.00m, true },
                    { 7, 3, new DateTime(2024, 4, 15, 18, 0, 0, 0, DateTimeKind.Unspecified), 1, 20.00m, true },
                    { 8, 4, new DateTime(2024, 4, 15, 21, 0, 0, 0, DateTimeKind.Unspecified), 1, 25.00m, true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Shows",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Theatres",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Theatres",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Theatres",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Theatres",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Theatres",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Theatres",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Movies");
        }
    }
}
