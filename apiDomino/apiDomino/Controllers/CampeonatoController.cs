using apiDomino.Data;
using apiDomino.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Reflection;
using System.Threading.Tasks;

namespace apiDomino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampeonatoController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CampeonatoController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Campeonato>>> GetCampeonato()
        {
            var campeonato = await _dbContext.Campeonato.ToListAsync();

            return Ok(campeonato);
        }
        [HttpGet("final")]
        public async Task<ActionResult<IEnumerable<Campeonato>>> GetFinal()
        {
            var confrontos = await _dbContext.Confrontos
                .Where(c => c.FlConcluido == 1 && c.FlFinal == 1)
                .ToListAsync();

            Campeonato campeonato = null;

            // Dicionário para armazenar o número de vitórias de cada dupla
            Dictionary<int, int> vitoriasPorDupla = new Dictionary<int, int>();

            // Percorrer todas as partidas e contar as vitórias
            foreach (var partida in confrontos)
            {
                if (partida.VencedorId != 0)
                {
                    // Incrementar o número de vitórias para a dupla vencedora
                    if (vitoriasPorDupla.ContainsKey(partida.VencedorId))
                        vitoriasPorDupla[partida.VencedorId]++;
                    else
                        vitoriasPorDupla[partida.VencedorId] = 1;
                }
            }

            // Verificar se alguma dupla venceu duas partidas
            foreach (var dupla in vitoriasPorDupla)
            {
                if (dupla.Value >= 2)
                {
                    var duplaCampea = await _dbContext.Duplas.FindAsync(dupla.Key);
                    var jogador = await _dbContext.Jogadores
                        .OrderByDescending(j => j.Pontos)
                        .Where(j => j.FlAtivo == 1)
                        .FirstOrDefaultAsync();

                    campeonato = new Campeonato
                    {
                        DuplaId = duplaCampea.Id,
                        DuplaNome = duplaCampea.Name,
                        PontosDupla = dupla.Value,
                        JogadorId = jogador.Id,
                        JogadorNome = jogador.Nome,
                        PontosJogador = jogador.Pontos
                    };

                }
            }

            return Ok(campeonato);
        }
        [HttpPost("campeao")]
        public async Task<IActionResult> InsereCampeao(Campeonato campeonato)
        {
            try
            {
                // Adicione o confronto ao contexto do banco de dados
                _dbContext.Campeonato.Add(campeonato);

                // Salve as alterações no banco de dados
                await _dbContext.SaveChangesAsync();

                // Retorne o confronto salvo com o status 201 (Created)
                return CreatedAtAction(nameof(GetCampeonato), new { id = campeonato.Id }, campeonato);
            }
            catch (Exception ex)
            {
                // Em caso de erro, retorne um erro de servidor com o status 500 (Internal Server Error)
                return StatusCode(500, new { error = "Erro ao salvar o confronto" });
            }
        }
    }
}
