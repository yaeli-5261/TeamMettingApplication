using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MeetSummarizer.Data.Migrations
{
    /// <inheritdoc />
    public partial class New222 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedAt", "Description", "RoleName", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7642), "System Administrator", "Admin", new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7643) },
                    { 2, new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7646), "System TeamHeadetor", "TeamHeader", new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7646) },
                    { 3, new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7648), "System Developmen", "Developmen", new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7649) }
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "administration" },
                    { 2, "develops" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
