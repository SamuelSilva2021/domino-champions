using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class AddTabelaConfrontos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Confrontos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PartidaId = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    PontosDupla1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador1Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador2Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    PontosDupla2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador1Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador2Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    VencedorId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Confrontos", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Confrontos");
        }
    }
}
