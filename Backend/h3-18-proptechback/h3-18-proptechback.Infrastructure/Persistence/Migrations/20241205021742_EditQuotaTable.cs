using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EditQuotaTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataGuarantors_LoanRequest_LoanRequestId",
                table: "DataGuarantors");

            migrationBuilder.DropForeignKey(
                name: "FK_DocumentsUsers_LoanRequest_LoanRequestId",
                table: "DocumentsUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_LoanRequest_DataUsers_DataUserId",
                table: "LoanRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_Loans_LoanRequest_LoanRequestId",
                table: "Loans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LoanRequest",
                table: "LoanRequest");

            migrationBuilder.RenameTable(
                name: "LoanRequest",
                newName: "LoanRequests");

            migrationBuilder.RenameIndex(
                name: "IX_LoanRequest_DataUserId",
                table: "LoanRequests",
                newName: "IX_LoanRequests_DataUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoanRequests",
                table: "LoanRequests",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_DataGuarantors_LoanRequests_LoanRequestId",
                table: "DataGuarantors",
                column: "LoanRequestId",
                principalTable: "LoanRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentsUsers_LoanRequests_LoanRequestId",
                table: "DocumentsUsers",
                column: "LoanRequestId",
                principalTable: "LoanRequests",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_LoanRequests_DataUsers_DataUserId",
                table: "LoanRequests",
                column: "DataUserId",
                principalTable: "DataUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_LoanRequests_LoanRequestId",
                table: "Loans",
                column: "LoanRequestId",
                principalTable: "LoanRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataGuarantors_LoanRequests_LoanRequestId",
                table: "DataGuarantors");

            migrationBuilder.DropForeignKey(
                name: "FK_DocumentsUsers_LoanRequests_LoanRequestId",
                table: "DocumentsUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_LoanRequests_DataUsers_DataUserId",
                table: "LoanRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_Loans_LoanRequests_LoanRequestId",
                table: "Loans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LoanRequests",
                table: "LoanRequests");

            migrationBuilder.RenameTable(
                name: "LoanRequests",
                newName: "LoanRequest");

            migrationBuilder.RenameIndex(
                name: "IX_LoanRequests_DataUserId",
                table: "LoanRequest",
                newName: "IX_LoanRequest_DataUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoanRequest",
                table: "LoanRequest",
                column: "ID");

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

            migrationBuilder.AddForeignKey(
                name: "FK_LoanRequest_DataUsers_DataUserId",
                table: "LoanRequest",
                column: "DataUserId",
                principalTable: "DataUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_LoanRequest_LoanRequestId",
                table: "Loans",
                column: "LoanRequestId",
                principalTable: "LoanRequest",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
