﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apiDomino.Data;

#nullable disable

namespace apiDomino.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240105230039_editDuplas")]
    partial class editDuplas
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.13");

            modelBuilder.Entity("apiDomino.Model.Campeonato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DuplaId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("DuplaNome")
                        .HasColumnType("TEXT");

                    b.Property<int>("JogadorId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("JogadorNome")
                        .HasColumnType("TEXT");

                    b.Property<int>("PontosDupla")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PontosJogador")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Campeonato");
                });

            modelBuilder.Entity("apiDomino.Model.Confronto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Dupla1Id")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Dupla1Jogador1Id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dupla1Jogador1Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("Dupla1Jogador1Pontos")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Dupla1Jogador2Id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dupla1Jogador2Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("Dupla1Jogador2Pontos")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dupla1Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("Dupla2Id")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Dupla2Jogador1Id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dupla2Jogador1Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("Dupla2Jogador1Pontos")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Dupla2Jogador2Id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dupla2Jogador2Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("Dupla2Jogador2Pontos")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dupla2Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("FlConcluido")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FlFaseGrupos")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FlFinal")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PartidaId")
                        .HasColumnType("TEXT");

                    b.Property<int>("PontosDupla1")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PontosDupla2")
                        .HasColumnType("INTEGER");

                    b.Property<int>("VencedorId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Confrontos");
                });

            modelBuilder.Entity("apiDomino.Model.Dupla", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("FlAtivo")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Jogador1Id")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Jogador2Id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("PartidasConcluidas")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Pontos")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PontosBatida")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PontosSofridos")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("Jogador1Id");

                    b.HasIndex("Jogador2Id");

                    b.ToTable("Duplas");
                });

            modelBuilder.Entity("apiDomino.Model.Jogador", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Apelido")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<bool>("FlAtivo")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Pontos")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Titulos")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Jogadores");
                });

            modelBuilder.Entity("apiDomino.Model.Dupla", b =>
                {
                    b.HasOne("apiDomino.Model.Jogador", "Jogador1")
                        .WithMany()
                        .HasForeignKey("Jogador1Id");

                    b.HasOne("apiDomino.Model.Jogador", "Jogador2")
                        .WithMany()
                        .HasForeignKey("Jogador2Id");

                    b.Navigation("Jogador1");

                    b.Navigation("Jogador2");
                });
#pragma warning restore 612, 618
        }
    }
}
