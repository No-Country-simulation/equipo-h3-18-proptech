using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updatefixinvestmant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateInitShare",
                table: "investmentFees");

            migrationBuilder.DropColumn(
                name: "IntialCapital",
                table: "investmentFees");

            migrationBuilder.DropColumn(
                name: "MonthlyInterest",
                table: "investmentFees");

            migrationBuilder.DropColumn(
                name: "Moth",
                table: "investmentFees");

            migrationBuilder.DropColumn(
                name: "Share",
                table: "investmentFees");

            migrationBuilder.DropColumn(
                name: "DatePaymant",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "Dateinitial",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "MonthlyInterest",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "Moth",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "Share",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "profit",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "returnInvestmant",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "year",
                table: "Investmants");

            migrationBuilder.RenameColumn(
                name: "year",
                table: "investmentFees",
                newName: "Month");

            migrationBuilder.RenameColumn(
                name: "capitalization",
                table: "investmentFees",
                newName: "Profit");

            migrationBuilder.RenameColumn(
                name: "Isactive",
                table: "Investmants",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "CaptialIntial",
                table: "Investmants",
                newName: "TotalProfit");

            migrationBuilder.AddColumn<decimal>(
                name: "CapitalInitial",
                table: "Investmants",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "DatePayment",
                table: "Investmants",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ReturnInvestment",
                table: "Investmants",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_investmentFees_InvestmantId",
                table: "investmentFees",
                column: "InvestmantId");

            migrationBuilder.AddForeignKey(
                name: "FK_investmentFees_Investmants_InvestmantId",
                table: "investmentFees",
                column: "InvestmantId",
                principalTable: "Investmants",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_investmentFees_Investmants_InvestmantId",
                table: "investmentFees");

            migrationBuilder.DropIndex(
                name: "IX_investmentFees_InvestmantId",
                table: "investmentFees");

            migrationBuilder.DropColumn(
                name: "CapitalInitial",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "DatePayment",
                table: "Investmants");

            migrationBuilder.DropColumn(
                name: "ReturnInvestment",
                table: "Investmants");

            migrationBuilder.RenameColumn(
                name: "Profit",
                table: "investmentFees",
                newName: "capitalization");

            migrationBuilder.RenameColumn(
                name: "Month",
                table: "investmentFees",
                newName: "year");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Investmants",
                newName: "Isactive");

            migrationBuilder.RenameColumn(
                name: "TotalProfit",
                table: "Investmants",
                newName: "CaptialIntial");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateInitShare",
                table: "investmentFees",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "IntialCapital",
                table: "investmentFees",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MonthlyInterest",
                table: "investmentFees",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Moth",
                table: "investmentFees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Share",
                table: "investmentFees",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "DatePaymant",
                table: "Investmants",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Dateinitial",
                table: "Investmants",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "MonthlyInterest",
                table: "Investmants",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Moth",
                table: "Investmants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Share",
                table: "Investmants",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "profit",
                table: "Investmants",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "returnInvestmant",
                table: "Investmants",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "year",
                table: "Investmants",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
