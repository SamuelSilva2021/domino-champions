using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

namespace apiDomino.Model
{
    public class Jogador
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        public string Email { get; set; } = null;
        public string Apelido { get; set; }
        public int Pontos { get; set; } = 0;
        public bool FlAtivo { get; set; } = true;
        public string UrlImagem { get; set; } = null;
        public int? Titulos { get; set; } = 0;
    }
}
