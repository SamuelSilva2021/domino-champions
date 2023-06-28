using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class alterTableConfrontos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FlFaseGrupos",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FlFinal",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlFaseGrupos",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "FlFinal",
                table: "Confrontos");
        }
    }
}
