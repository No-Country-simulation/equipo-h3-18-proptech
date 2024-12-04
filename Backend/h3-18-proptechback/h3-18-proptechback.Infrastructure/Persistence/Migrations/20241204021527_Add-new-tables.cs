using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Addnewtables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataGuarantors_DataUsers_DataUserId",
                table: "DataGuarantors");

            migrationBuilder.DropColumn(
                name: "ExpiredDateDNI",
                table: "DocumentsUsers");

            migrationBuilder.DropColumn(
                name: "Salary",
                table: "DocumentsUsers");

            migrationBuilder.DropColumn(
                name: "LoanId",
                table: "DocumentsGuarantors");

            migrationBuilder.DropColumn(
                name: "StateValidation",
                table: "DataGuarantors");

            migrationBuilder.RenameColumn(
                name: "LoanId",
                table: "DocumentsUsers",
                newName: "LoanRequestId");

            migrationBuilder.RenameColumn(
                name: "SalaryU2RL",
                table: "DocumentsGuarantors",
                newName: "Salary2URL");

            migrationBuilder.RenameColumn(
                name: "DataUserId",
                table: "DataGuarantors",
                newName: "LoanRequestId");

            migrationBuilder.RenameIndex(
                name: "IX_DataGuarantors_DataUserId",
                table: "DataGuarantors",
                newName: "IX_DataGuarantors_LoanRequestId");

            migrationBuilder.AddColumn<string>(
                name: "Salary2URL",
                table: "DocumentsUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Salary3URL",
                table: "DocumentsUsers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LoanRequest",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    DataUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    LotCost = table.Column<decimal>(type: "numeric", nullable: false),
                    DownPayment = table.Column<decimal>(type: "numeric", nullable: false),
                    QuotasCount = table.Column<int>(type: "integer", nullable: false),
                    StateRequest = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Createby = table.Column<string>(type: "text", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanRequest", x => x.ID);
                    table.ForeignKey(
                        name: "FK_LoanRequest_DataUsers_DataUserId",
                        column: x => x.DataUserId,
                        principalTable: "DataUsers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Loans",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    LoanRequestId = table.Column<Guid>(type: "uuid", nullable: false),
                    StateLoan = table.Column<int>(type: "integer", nullable: false),
                    FinancingAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    PaymentMonth = table.Column<decimal>(type: "numeric", nullable: false),
                    TotalPayment = table.Column<decimal>(type: "numeric", nullable: false),
                    InterestRate = table.Column<decimal>(type: "numeric", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Createby = table.Column<string>(type: "text", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loans", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Loans_LoanRequest_LoanRequestId",
                        column: x => x.LoanRequestId,
                        principalTable: "LoanRequest",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Quotas",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    LoanId = table.Column<Guid>(type: "uuid", nullable: false),
                    QuotaNumber = table.Column<int>(type: "integer", nullable: false),
                    PayDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    State = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Createby = table.Column<string>(type: "text", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quotas", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Quotas_Loans_LoanId",
                        column: x => x.LoanId,
                        principalTable: "Loans",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsUsers_LoanRequestId",
                table: "DocumentsUsers",
                column: "LoanRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRequest_DataUserId",
                table: "LoanRequest",
                column: "DataUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Loans_LoanRequestId",
                table: "Loans",
                column: "LoanRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Quotas_LoanId",
                table: "Quotas",
                column: "LoanId");

            migrationBuilder.AddForeignKey(
                name: "FK_DataGuarantors_LoanRequest_LoanRequestId",
                table: "DataGuarantors",
                column: "LoanRequestId",
                principalTable: "LoanRequest",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentsUsers_LoanRequest_LoanRequestId",
                table: "DocumentsUsers",
                column: "LoanRequestId",
                principalTable: "LoanRequest",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataGuarantors_LoanRequest_LoanRequestId",
                table: "DataGuarantors");

            migrationBuilder.DropForeignKey(
                name: "FK_DocumentsUsers_LoanRequest_LoanRequestId",
                table: "DocumentsUsers");

            migrationBuilder.DropTable(
                name: "Quotas");

            migrationBuilder.DropTable(
                name: "Loans");

            migrationBuilder.DropTable(
                name: "LoanRequest");

            migrationBuilder.DropIndex(
                name: "IX_DocumentsUsers_LoanRequestId",
                table: "DocumentsUsers");

            migrationBuilder.DropColumn(
                name: "Salary2URL",
                table: "DocumentsUsers");

            migrationBuilder.DropColumn(
                name: "Salary3URL",
                table: "DocumentsUsers");

            migrationBuilder.RenameColumn(
                name: "LoanRequestId",
                table: "DocumentsUsers",
                newName: "LoanId");

            migrationBuilder.RenameColumn(
                name: "Salary2URL",
                table: "DocumentsGuarantors",
                newName: "SalaryU2RL");

            migrationBuilder.RenameColumn(
                name: "LoanRequestId",
                table: "DataGuarantors",
                newName: "DataUserId");

            migrationBuilder.RenameIndex(
                name: "IX_DataGuarantors_LoanRequestId",
                table: "DataGuarantors",
                newName: "IX_DataGuarantors_DataUserId");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiredDateDNI",
                table: "DocumentsUsers",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                table: "DocumentsUsers",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LoanId",
                table: "DocumentsGuarantors",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StateValidation",
                table: "DataGuarantors",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_DataGuarantors_DataUsers_DataUserId",
                table: "DataGuarantors",
                column: "DataUserId",
                principalTable: "DataUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
