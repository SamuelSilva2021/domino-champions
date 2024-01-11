using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class alterPlayers : Migration
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
                    DuplaId = table.Column<int>(type: "INTEGER", nullable: false),
                    DuplaNome = table.Column<string>(type: "TEXT", nullable: true),
                    PontosDupla = table.Column<int>(type: "INTEGER", nullable: false),
                    JogadorId = table.Column<int>(type: "INTEGER", nullable: false),
                    JogadorNome = table.Column<string>(type: "TEXT", nullable: true),
                    PontosJogador = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Campeonato", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Confrontos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PartidaId = table.Column<string>(type: "TEXT", nullable: true),
                    Dupla1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Nome = table.Column<string>(type: "TEXT", nullable: true),
                    PontosDupla1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador1Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Dupla1Jogador1Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla1Jogador2Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Dupla1Jogador2Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Nome = table.Column<string>(type: "TEXT", nullable: true),
                    PontosDupla2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador1Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Dupla2Jogador1Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Dupla2Jogador2Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Dupla2Jogador2Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    VencedorId = table.Column<int>(type: "INTEGER", nullable: false),
                    FlConcluido = table.Column<int>(type: "INTEGER", nullable: false),
                    FlFaseGrupos = table.Column<int>(type: "INTEGER", nullable: false),
                    FlFinal = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Confrontos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jogadores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Apelido = table.Column<string>(type: "TEXT", nullable: true),
                    Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    FlAtivo = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogadores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Duplas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Jogador1Id = table.Column<int>(type: "INTEGER", nullable: true),
                    Jogador2Id = table.Column<int>(type: "INTEGER", nullable: true),
                    Pontos = table.Column<int>(type: "INTEGER", nullable: false),
                    PontosBatida = table.Column<int>(type: "INTEGER", nullable: false),
                    PartidasConcluidas = table.Column<int>(type: "INTEGER", nullable: false),
                    FlAtivo = table.Column<int>(type: "INTEGER", nullable: false),
                    PontosSofridos = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Duplas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Duplas_Jogadores_Jogador1Id",
                        column: x => x.Jogador1Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Duplas_Jogadores_Jogador2Id",
                        column: x => x.Jogador2Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Duplas_Jogador1Id",
                table: "Duplas",
                column: "Jogador1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Duplas_Jogador2Id",
                table: "Duplas",
                column: "Jogador2Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Campeonato");

            migrationBuilder.DropTable(
                name: "Confrontos");

            migrationBuilder.DropTable(
                name: "Duplas");

            migrationBuilder.DropTable(
                name: "Jogadores");
        }
    }
}
