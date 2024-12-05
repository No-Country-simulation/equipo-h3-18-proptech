using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class editloanrequesttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CBU",
                table: "LoanRequests",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CBU",
                table: "LoanRequests");
        }
    }
}
