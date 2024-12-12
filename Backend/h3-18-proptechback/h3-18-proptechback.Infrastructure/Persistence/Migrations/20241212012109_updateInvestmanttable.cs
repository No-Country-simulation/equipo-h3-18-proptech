using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updateInvestmanttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "reinvest",
                table: "Investmants");

            migrationBuilder.AddColumn<int>(
                name: "year",
                table: "investmentFees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "MonthlyInterest",
                table: "Investmants",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

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
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "profit",
                table: "Investmants",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "year",
                table: "Investmants",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "year",
                table: "investmentFees");

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
                name: "year",
                table: "Investmants");

            migrationBuilder.AddColumn<bool>(
                name: "reinvest",
                table: "Investmants",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
