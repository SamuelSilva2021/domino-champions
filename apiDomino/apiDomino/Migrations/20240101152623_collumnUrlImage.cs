using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class collumnUrlImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "urlImagem",
                table: "Jogadores",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "urlImagem",
                table: "Jogadores");
        }
    }
}
