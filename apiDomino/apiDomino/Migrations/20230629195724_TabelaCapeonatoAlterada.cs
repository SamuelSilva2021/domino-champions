using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class TabelaCapeonatoAlterada : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campeonato_Duplas_DuplaCampeaId",
                table: "Campeonato");

            migrationBuilder.DropForeignKey(
                name: "FK_Campeonato_Jogadores_MaiorPontuadorId",
                table: "Campeonato");

            migrationBuilder.DropIndex(
                name: "IX_Campeonato_DuplaCampeaId",
                table: "Campeonato");

            migrationBuilder.DropIndex(
                name: "IX_Campeonato_MaiorPontuadorId",
                table: "Campeonato");

            migrationBuilder.RenameColumn(
                name: "PontosMaiorPontuador",
                table: "Campeonato",
                newName: "PontosJogador");

            migrationBuilder.RenameColumn(
                name: "MaiorPontuadorId",
                table: "Campeonato",
                newName: "JogadorId");

            migrationBuilder.RenameColumn(
                name: "DuplaCampeaId",
                table: "Campeonato",
                newName: "DuplaId");

            migrationBuilder.AddColumn<string>(
                name: "DuplaNome",
                table: "Campeonato",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "JogadorNome",
                table: "Campeonato",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DuplaNome",
                table: "Campeonato");

            migrationBuilder.DropColumn(
                name: "JogadorNome",
                table: "Campeonato");

            migrationBuilder.RenameColumn(
                name: "PontosJogador",
                table: "Campeonato",
                newName: "PontosMaiorPontuador");

            migrationBuilder.RenameColumn(
                name: "JogadorId",
                table: "Campeonato",
                newName: "MaiorPontuadorId");

            migrationBuilder.RenameColumn(
                name: "DuplaId",
                table: "Campeonato",
                newName: "DuplaCampeaId");

            migrationBuilder.CreateIndex(
                name: "IX_Campeonato_DuplaCampeaId",
                table: "Campeonato",
                column: "DuplaCampeaId");

            migrationBuilder.CreateIndex(
                name: "IX_Campeonato_MaiorPontuadorId",
                table: "Campeonato",
                column: "MaiorPontuadorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Campeonato_Duplas_DuplaCampeaId",
                table: "Campeonato",
                column: "DuplaCampeaId",
                principalTable: "Duplas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Campeonato_Jogadores_MaiorPontuadorId",
                table: "Campeonato",
                column: "MaiorPontuadorId",
                principalTable: "Jogadores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
