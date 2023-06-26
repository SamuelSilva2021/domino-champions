using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace apiDomino.Model
{
    public class Jogador
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        public int Pontos { get; set; }
        [DefaultValue(1)]
        public int FlAtivo { get; set; } = 1;
    }
}
