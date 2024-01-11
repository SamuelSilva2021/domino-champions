using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDomino.Migrations
{
    /// <inheritdoc />
    public partial class editedConfrontos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Duplas_Jogadores_Jogador1Id",
                table: "Duplas");

            migrationBuilder.DropForeignKey(
                name: "FK_Duplas_Jogadores_Jogador2Id",
                table: "Duplas");

            migrationBuilder.DropColumn(
                name: "Dupla1Jogador1Id",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Jogador1Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Jogador1Pontos",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Jogador2Id",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Jogador2Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Jogador2Pontos",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla1Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador1Id",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador1Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador1Pontos",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador2Id",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador2Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Jogador2Pontos",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "Dupla2Nome",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "PartidaId",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "PontosDupla1",
                table: "Confrontos");

            migrationBuilder.DropColumn(
                name: "PontosDupla2",
                table: "Confrontos");

            migrationBuilder.AlterColumn<int>(
                name: "Jogador2Id",
                table: "Duplas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Jogador1Id",
                table: "Duplas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Dupla2Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Dupla1Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Confrontos",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_Confrontos_Dupla1Id",
                table: "Confrontos",
                column: "Dupla1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Confrontos_Dupla2Id",
                table: "Confrontos",
                column: "Dupla2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Confrontos_Duplas_Dupla1Id",
                table: "Confrontos",
                column: "Dupla1Id",
                principalTable: "Duplas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Confrontos_Duplas_Dupla2Id",
                table: "Confrontos",
                column: "Dupla2Id",
                principalTable: "Duplas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Duplas_Jogadores_Jogador1Id",
                table: "Duplas",
                column: "Jogador1Id",
                principalTable: "Jogadores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Duplas_Jogadores_Jogador2Id",
                table: "Duplas",
                column: "Jogador2Id",
                principalTable: "Jogadores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Confrontos_Duplas_Dupla1Id",
                table: "Confrontos");

            migrationBuilder.DropForeignKey(
                name: "FK_Confrontos_Duplas_Dupla2Id",
                table: "Confrontos");

            migrationBuilder.DropForeignKey(
                name: "FK_Duplas_Jogadores_Jogador1Id",
                table: "Duplas");

            migrationBuilder.DropForeignKey(
                name: "FK_Duplas_Jogadores_Jogador2Id",
                table: "Duplas");

            migrationBuilder.DropIndex(
                name: "IX_Confrontos_Dupla1Id",
                table: "Confrontos");

            migrationBuilder.DropIndex(
                name: "IX_Confrontos_Dupla2Id",
                table: "Confrontos");

            migrationBuilder.AlterColumn<int>(
                name: "Jogador2Id",
                table: "Duplas",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Jogador1Id",
                table: "Duplas",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Dupla2Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Dupla1Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "Dupla1Jogador1Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Dupla1Jogador1Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Dupla1Jogador1Pontos",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Dupla1Jogador2Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Dupla1Jogador2Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Dupla1Jogador2Pontos",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Dupla1Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Dupla2Jogador1Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Dupla2Jogador1Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Dupla2Jogador1Pontos",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Dupla2Jogador2Id",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Dupla2Jogador2Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Dupla2Jogador2Pontos",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Dupla2Nome",
                table: "Confrontos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartidaId",
                table: "Confrontos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PontosDupla1",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PontosDupla2",
                table: "Confrontos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Duplas_Jogadores_Jogador1Id",
                table: "Duplas",
                column: "Jogador1Id",
                principalTable: "Jogadores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Duplas_Jogadores_Jogador2Id",
                table: "Duplas",
                column: "Jogador2Id",
                principalTable: "Jogadores",
                principalColumn: "Id");
        }
    }
}
