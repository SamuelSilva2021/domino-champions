using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class collumnTitilos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "urlImagem",
                table: "Jogadores",
                newName: "UrlImagem");

            migrationBuilder.AddColumn<int>(
                name: "Titulos",
                table: "Jogadores",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Titulos",
                table: "Jogadores");

            migrationBuilder.RenameColumn(
                name: "UrlImagem",
                table: "Jogadores",
                newName: "urlImagem");
        }
    }
}
