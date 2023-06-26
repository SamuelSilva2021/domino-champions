using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class AlterTableConfrontoAddCampos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Dupla1Jogador1Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dupla1Jogador2Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dupla1Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dupla2Jogador1Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dupla2Jogador2Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dupla2Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dupla1Jogador1Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Jogador2Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador1Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador2Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Nome",
                table: "Confrontos");
        }
    }
}
