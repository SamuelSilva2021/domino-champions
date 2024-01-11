using System.ComponentModel.DataAnnotations;

namespace apiDomino.Model
{
    public class Campeonato
    {
        [Key]
        public int Id { get; set; }
        public int DuplaId { get; set; }
        public string DuplaNome { get; set; }
        public int PontosDupla { get; set; }
        public int JogadorId { get; set; }
        public string JogadorNome { get; set; }
        public int PontosJogador { get; set; }
    }
}
