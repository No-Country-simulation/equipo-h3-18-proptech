using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CreateTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DataGuarantors",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    UserID = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    DNI = table.Column<string>(type: "text", nullable: true),
                    CUIT = table.Column<string>(type: "text", nullable: false),
                    PassportID = table.Column<string>(type: "text", nullable: true),
                    IsComplete = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataGuarantors", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "DataUsers",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    UserID = table.Column<Guid>(type: "uuid", nullable: false),
                    DNI = table.Column<string>(type: "text", nullable: true),
                    CUIT = table.Column<string>(type: "text", nullable: false),
                    PassportID = table.Column<string>(type: "text", nullable: true),
                    IsComplete = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataUsers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "DocumentsGuarantors",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    DataGuarantorID = table.Column<Guid>(type: "uuid", nullable: false),
                    PhotoURL = table.Column<string>(type: "text", nullable: false),
                    FrontDNIURL = table.Column<string>(type: "text", nullable: false),
                    BackDNIURL = table.Column<string>(type: "text", nullable: false),
                    SalaryURL = table.Column<string>(type: "text", nullable: false),
                    ProofAddressURL = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentsGuarantors", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DocumentsGuarantors_DataGuarantors_DataGuarantorID",
                        column: x => x.DataGuarantorID,
                        principalTable: "DataGuarantors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentsUsers",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    DataUserID = table.Column<Guid>(type: "uuid", nullable: false),
                    PhotoURL = table.Column<string>(type: "text", nullable: false),
                    FrontDNIURL = table.Column<string>(type: "text", nullable: false),
                    BackDNIURL = table.Column<string>(type: "text", nullable: false),
                    SalaryURL = table.Column<string>(type: "text", nullable: false),
                    ProofAddressURL = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentsUsers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DocumentsUsers_DataUsers_DataUserID",
                        column: x => x.DataUserID,
                        principalTable: "DataUsers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsGuarantors_DataGuarantorID",
                table: "DocumentsGuarantors",
                column: "DataGuarantorID");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsUsers_DataUserID",
                table: "DocumentsUsers",
                column: "DataUserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentsGuarantors");

            migrationBuilder.DropTable(
                name: "DocumentsUsers");

            migrationBuilder.DropTable(
                name: "DataGuarantors");

            migrationBuilder.DropTable(
                name: "DataUsers");
        }
    }
}
