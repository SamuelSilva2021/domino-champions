using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class TabelaCapeonato : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Campeonato",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DuplaCampeaId = table.Column<int>(type: "INTEGER", nullable: false),
                    PontosDupla = table.Column<int>(type: "INTEGER", nullable: false),
                    MaiorPontuadorId = table.Column<int>(type: "INTEGER", nullable: false),
                    PontosMaiorPontuador = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Campeonato", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Campeonato_Duplas_DuplaCampeaId",
                        column: x => x.DuplaCampeaId,
                        principalTable: "Duplas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Campeonato_Jogadores_MaiorPontuadorId",
                        column: x => x.MaiorPontuadorId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Campeonato_DuplaCampeaId",
                table: "Campeonato",
                column: "DuplaCampeaId");

            migrationBuilder.CreateIndex(
                name: "IX_Campeonato_MaiorPontuadorId",
                table: "Campeonato",
                column: "MaiorPontuadorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Campeonato");
        }
    }
}
