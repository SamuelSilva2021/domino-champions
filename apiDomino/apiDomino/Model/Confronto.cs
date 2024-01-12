using apiDomino.Model;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace apiDomino.Model
{
    public class Confronto
    {
        [Key]
        public Guid Id { get; set; }
        public Dupla Dupla1 { get; set; }
        public int PtsBtdDp1Jogador1 { get; set; }
        public int PtsBtdDp1Jogador2 { get; set; }
        public Dupla Dupla2 { get; set; }
        public int PtsBtdDp2Jogador1 { get; set; }
        public int PtsBtdDp2Jogador2 { get; set; }
        public int VencedorId { get; set; }
        public int FlConcluido { get; set; }
    }
}
