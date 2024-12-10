using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableDataUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpiredDateDNI",
                table: "DocumentsGuarantors");

            migrationBuilder.DropColumn(
                name: "Salary",
                table: "DocumentsGuarantors");

            migrationBuilder.DropColumn(
                name: "IdentityUserId",
                table: "DataUsers");

            migrationBuilder.DropColumn(
                name: "IsComplete",
                table: "DataGuarantors");

            migrationBuilder.AddColumn<string>(
                name: "Salary3URL",
                table: "DocumentsGuarantors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SalaryU2RL",
                table: "DocumentsGuarantors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DataUserId",
                table: "DataGuarantors",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "StateValidation",
                table: "DataGuarantors",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DataGuarantors_DataUserId",
                table: "DataGuarantors",
                column: "DataUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DataGuarantors_DataUsers_DataUserId",
                table: "DataGuarantors",
                column: "DataUserId",
                principalTable: "DataUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataGuarantors_DataUsers_DataUserId",
                table: "DataGuarantors");

            migrationBuilder.DropIndex(
                name: "IX_DataGuarantors_DataUserId",
                table: "DataGuarantors");

            migrationBuilder.DropColumn(
                name: "Salary3URL",
                table: "DocumentsGuarantors");

            migrationBuilder.DropColumn(
                name: "SalaryU2RL",
                table: "DocumentsGuarantors");

            migrationBuilder.DropColumn(
                name: "DataUserId",
                table: "DataGuarantors");

            migrationBuilder.DropColumn(
                name: "StateValidation",
                table: "DataGuarantors");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiredDateDNI",
                table: "DocumentsGuarantors",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                table: "DocumentsGuarantors",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "IdentityUserId",
                table: "DataUsers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsComplete",
                table: "DataGuarantors",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
