using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class editDuplas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Duplas",
                newName: "Nome");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Duplas",
                newName: "Name");
        }
    }
}
