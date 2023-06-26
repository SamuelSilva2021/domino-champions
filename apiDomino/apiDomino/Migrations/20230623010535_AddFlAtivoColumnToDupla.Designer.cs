﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apiDomino.Data;

#nullable disable

namespace apiDomino.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230623010535_AddFlAtivoColumnToDupla")]
    partial class AddFlAtivoColumnToDupla
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.5");

            modelBuilder.Entity("apiDomino.Model.Dupla", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("FlAtivo")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Jogador1Id")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Jogador2Id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

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

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Jogadores");
                });

            modelBuilder.Entity("apiDomino.Model.Dupla", b =>
                {
                    b.HasOne("apiDomino.Model.Jogador", "Jogador1")
                        .WithMany()
                        .HasForeignKey("Jogador1Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apiDomino.Model.Jogador", "Jogador2")
                        .WithMany()
                        .HasForeignKey("Jogador2Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Jogador1");

                    b.Navigation("Jogador2");
                });
#pragma warning restore 612, 618
        }
    }
}
