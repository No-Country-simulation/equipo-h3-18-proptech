using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InvestmantTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Investmants",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    CaptialIntial = table.Column<decimal>(type: "numeric", nullable: false),
                    Dateinitial = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DatePaymant = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Isactive = table.Column<bool>(type: "boolean", nullable: false),
                    IsPayed = table.Column<bool>(type: "boolean", nullable: false),
                    returnInvestmant = table.Column<decimal>(type: "numeric", nullable: false),
                    reinvest = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Createby = table.Column<string>(type: "text", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Investmants", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "investmentFees",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    InvestmantId = table.Column<Guid>(type: "uuid", nullable: false),
                    IntialCapital = table.Column<decimal>(type: "numeric", nullable: false),
                    DateInitShare = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DateCloseShare = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Moth = table.Column<int>(type: "integer", nullable: false),
                    MonthlyInterest = table.Column<decimal>(type: "numeric", nullable: false),
                    Share = table.Column<decimal>(type: "numeric", nullable: false),
                    capitalization = table.Column<decimal>(type: "numeric", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Createby = table.Column<string>(type: "text", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_investmentFees", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Moneys",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    NameMoney = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Createby = table.Column<string>(type: "text", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moneys", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Investmants");

            migrationBuilder.DropTable(
                name: "investmentFees");

            migrationBuilder.DropTable(
                name: "Moneys");
        }
    }
}
