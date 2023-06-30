using apiDomino.Model;
using Microsoft.EntityFrameworkCore;

namespace apiDomino.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Jogador> Jogadores { get; set; }
        public DbSet<Dupla> Duplas { get; set; }
        public DbSet<Confronto> Confrontos { get; set;}
        public DbSet<Campeonato> Campeonato { get; set; }
    }
}
