using apiDomino.Model;
using System.ComponentModel.DataAnnotations;

namespace apiDomino.Model
{
    public class Confronto
    {
        [Key]
        public int Id { get; set; }

        public string PartidaId { get; set; }

        public int Dupla1Id { get; set; }
        public string Dupla1Nome { get; set; }
        public int PontosDupla1 { get; set; }
        public int Dupla1Jogador1Id { get; set; }
        public string Dupla1Jogador1Nome { get; set; }
        public int Dupla1Jogador1Pontos { get; set; }
        public int Dupla1Jogador2Id { get; set; }
        public string Dupla1Jogador2Nome { get; set; }
        public int Dupla1Jogador2Pontos { get; set; }

        public int Dupla2Id { get; set; }
        public string Dupla2Nome { get; set; }
        public int PontosDupla2 { get; set; }
        public int Dupla2Jogador1Id { get; set; }
        public string Dupla2Jogador1Nome { get; set; }
        public int Dupla2Jogador1Pontos { get; set; }
        public int Dupla2Jogador2Id { get; set; }
        public string Dupla2Jogador2Nome { get; set; }
        public int Dupla2Jogador2Pontos { get; set; }

        public int VencedorId { get; set; }
        public int FlConcluido { get; set; }
    }
}
