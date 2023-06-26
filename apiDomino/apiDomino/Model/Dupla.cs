using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiDomino.Model
{
    public class Dupla
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome da dupla obrigatório")]
        public string Name { get; set; }
        public Jogador Jogador1 { get; set; }
        public Jogador Jogador2 { get; set; }
        [DefaultValue(0)]
        public int Pontos { get; set; }
        [DefaultValue(0)]
        public int PontosBatida { get; set; }
        [DefaultValue(0)]
        public int PartidasConcluidas { get; set; }
        [DefaultValue(1)]
        public int FlAtivo { get; set; } = 1;
    }

}
