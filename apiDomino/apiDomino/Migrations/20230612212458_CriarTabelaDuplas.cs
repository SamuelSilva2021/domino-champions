using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class CriarTabelaDuplas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Duplas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Jogador1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Jogador2Id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Duplas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Duplas_Jogadores_Jogador1Id",
                        column: x => x.Jogador1Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Duplas_Jogadores_Jogador2Id",
                        column: x => x.Jogador2Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "Duplas");
        }
    }
}
