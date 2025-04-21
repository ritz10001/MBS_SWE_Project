using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddedDateTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a9f1ecd-20b3-4173-acae-0ab3eaacc3da");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "62c3b157-dfed-44fb-b78f-5c8b746f00b0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "26628f23-d1b6-4ab3-a5dd-775cc716e38a", null, "User", "USER" },
                    { "42b5a141-831e-4a60-9ac7-904d35c9c54d", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "26628f23-d1b6-4ab3-a5dd-775cc716e38a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42b5a141-831e-4a60-9ac7-904d35c9c54d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5a9f1ecd-20b3-4173-acae-0ab3eaacc3da", null, "User", "USER" },
                    { "62c3b157-dfed-44fb-b78f-5c8b746f00b0", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
