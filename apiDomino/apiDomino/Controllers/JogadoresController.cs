using apiDomino.Data;
using apiDomino.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiDomino.Util;

namespace apiDomino.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class JogadoresController: ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public JogadoresController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jogador>>> Get()
        {
            var jogadores = await _dbContext.Jogadores.ToListAsync();
            if (jogadores.Count == 0)
            {
                return StatusCode(400, new { message = "Nenhum jogador encontrado" });
            }
            return Ok(jogadores);
        }
        [HttpGet("disponivel")]
        public async Task<ActionResult<List<Jogador>>> GetDisponiveis()
        {
            var jogadores = await _dbContext.Jogadores
                .Where(j => j.FlAtivo && !_dbContext.Duplas.Any(d => d.Jogador1 == j || d.Jogador2 == j))
                .ToListAsync();

            if(jogadores == null) 
            {
                return NotFound();
            }
            return Ok(jogadores);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Jogador>> GetJogador(int id)
        {
            var jogador = await _dbContext.Jogadores.FindAsync(id);

            if (jogador == null)
            {
                return NotFound();
            }

            return jogador;
        }
        [HttpGet("ranking")]
        public async Task<ActionResult<IEnumerable<Jogador>>> GetRankingJogadores()
        {
            var jogadores = await _dbContext.Jogadores
                        .OrderByDescending(j => j.Pontos)
                        .Where(j => j.FlAtivo)
                        .Select(j => new { j.Nome, j.Pontos})
                        .ToListAsync();

            if (jogadores.Count == 0)
            {
                return NotFound();
            }

            return Ok(jogadores);
        }

        [HttpPost]
        public async Task<ActionResult<Jogador>> AddJogador([FromForm] Jogador jogador, IFormFile imagem)
        {
            if (imagem != null)
            {
                var diretorio = Constantes.DIRETORIO_IMAGENS;
                var caminhoCompleto = Path.Combine(diretorio, imagem.FileName);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await imagem.CopyToAsync(stream);
                }

                jogador.UrlImagem = Path.Combine(imagem.FileName);
            }
            _dbContext.Jogadores.Add(jogador);      
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJogador), new { id = jogador.Id }, jogador);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJogador(int id)
        {
            var jogador = await _dbContext.Jogadores.FindAsync(id);

            if (jogador == null)
            {
                return NotFound();
            }

            var dupla = await _dbContext.Duplas
                .Where(d => d.Jogador1.Id == jogador.Id || d.Jogador2.Id == jogador.Id)
                .FirstOrDefaultAsync();

            if (dupla != null)
            {
                return BadRequest($"Não é possível remover o jogador: {jogador.Nome}, o mesmo está vinculado a dupla: {dupla.Nome}");
            }

            _dbContext.Jogadores.Remove(jogador);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Jogador removido com sucesso" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJogador([FromForm] Jogador jogador, IFormFile imagem, int id)
        {
            if (id != jogador.Id)
            {
                return BadRequest();
            }
            if (imagem != null)
            {
                var diretorio = Constantes.DIRETORIO_IMAGENS;
                var caminhoCompleto = Path.Combine(diretorio, imagem.FileName);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await imagem.CopyToAsync(stream);
                }

                jogador.UrlImagem = Path.Combine(imagem.FileName);
            }
            
            _dbContext.Entry(jogador).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JogadorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Jogador atualizado com sucesso" });
        }

        private bool JogadorExists(int id)
        {
            return _dbContext.Jogadores.Any(j => j.Id == id);
        }


    }
}
