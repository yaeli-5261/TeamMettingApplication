using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeetSummarizer.Data.Migrations
{
    /// <inheritdoc />
    public partial class New333 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 19, 19, 47, 19, 417, DateTimeKind.Utc).AddTicks(8327), new DateTime(2025, 5, 19, 19, 47, 19, 417, DateTimeKind.Utc).AddTicks(8328) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 19, 19, 47, 19, 417, DateTimeKind.Utc).AddTicks(8331), new DateTime(2025, 5, 19, 19, 47, 19, 417, DateTimeKind.Utc).AddTicks(8331) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 19, 19, 47, 19, 417, DateTimeKind.Utc).AddTicks(8333), new DateTime(2025, 5, 19, 19, 47, 19, 417, DateTimeKind.Utc).AddTicks(8334) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7642), new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7643) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7646), new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7646) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7648), new DateTime(2025, 5, 19, 19, 44, 50, 678, DateTimeKind.Utc).AddTicks(7649) });
        }
    }
}
