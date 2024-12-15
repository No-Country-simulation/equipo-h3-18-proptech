using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class DeleteMonthColumninInvestmentFee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Month",
                table: "investmentFees");

            migrationBuilder.DropColumn(
                name: "CapitalInitial",
                table: "Investmants");

            migrationBuilder.RenameColumn(
                name: "ReturnInvestment",
                table: "Investmants",
                newName: "CurrentAmount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CurrentAmount",
                table: "Investmants",
                newName: "ReturnInvestment");

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "investmentFees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "CapitalInitial",
                table: "Investmants",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
