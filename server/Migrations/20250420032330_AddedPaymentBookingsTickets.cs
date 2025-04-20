using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddedPaymentBookingsTickets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "98c995ef-f60c-42b9-9791-bb9c9f95d6b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c5b4a49f-0e59-4390-8003-9f2166e841ac");

            migrationBuilder.RenameColumn(
                name: "isScanned",
                table: "Tickets",
                newName: "IsScanned");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Payments",
                newName: "PaymentStatus");

            migrationBuilder.AddColumn<DateTime>(
                name: "IssueDate",
                table: "Tickets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Payments",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfTickets",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentId",
                table: "Booking",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5a9f1ecd-20b3-4173-acae-0ab3eaacc3da", null, "User", "USER" },
                    { "62c3b157-dfed-44fb-b78f-5c8b746f00b0", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a9f1ecd-20b3-4173-acae-0ab3eaacc3da");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "62c3b157-dfed-44fb-b78f-5c8b746f00b0");

            migrationBuilder.DropColumn(
                name: "IssueDate",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "NumberOfTickets",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "Booking");

            migrationBuilder.RenameColumn(
                name: "IsScanned",
                table: "Tickets",
                newName: "isScanned");

            migrationBuilder.RenameColumn(
                name: "PaymentStatus",
                table: "Payments",
                newName: "Status");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "98c995ef-f60c-42b9-9791-bb9c9f95d6b8", null, "User", "USER" },
                    { "c5b4a49f-0e59-4390-8003-9f2166e841ac", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
