﻿using apiDomino.Data;
using apiDomino.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiDomino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DuplasController:ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public DuplasController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dupla>>> GetDupla()
        {
            var duplas = await _dbContext.Duplas
                    .Include(d => d.Jogador1)
                    .Include(d => d.Jogador2)
                    .ToListAsync();

            return Ok(duplas);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDupla(int id)
        {
            var dupla = await _dbContext.Duplas
                .Include(d => d.Jogador1)
                .Include(d => d.Jogador2)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (dupla == null)
            {
                return NotFound();
            }

            return Ok(dupla);
        }

        [HttpGet("ranking")]
        public async Task<IActionResult> GetRankigDupla()
        {
            var duplas = await _dbContext.Duplas
                        .Include(d => d.Jogador1)
                        .Include(d => d.Jogador2)
                        .OrderByDescending(d => d.Pontos)
                        .ThenByDescending(d => d.PontosBatida)
                        .ThenBy(d => d.PontosSofridos)
                        .Where(d => d.FlAtivo)
                        .ToListAsync();

            return Ok(duplas);
        }

        [HttpPost]
        public async Task<ActionResult<Dupla>> AddDupla(Dupla dupla)
        {
            if (string.IsNullOrEmpty(dupla.Nome))
            {
                return BadRequest(new { errors = new[] { new { field = "Name", message = "Nome da dupla obrigatório" } } });
            }

            // Verificar se os jogadores já estão em duplas


            var jogadorIds = await _dbContext.Duplas
                            .Where(d => d.FlAtivo &&
                                   ((d.Jogador1.Id == dupla.Jogador1.Id || d.Jogador1.Id == dupla.Jogador2.Id) ||
                                    (d.Jogador2.Id == dupla.Jogador1.Id || d.Jogador2.Id == dupla.Jogador2.Id)))
                            .Select(d => new {
                                Jogador1Id = d.Jogador1.Id,
                                Jogador1Nome = d.Jogador1.Nome,
                                Jogador2Id = d.Jogador2.Id,
                                Jogador2Nome = d.Jogador2.Nome
                            })
                            .ToListAsync();

            if (jogadorIds.Count > 0)
            {
                return BadRequest(new { errors = new[] { new { field = "Pertence", message = "Um ou ambos os jogadores já pertencem a outra dupla." } } });
            }

            if (dupla.Jogador1.Id == dupla.Jogador2.Id)
            {
                return BadRequest(new { errors = new[] { new { field = "Iguais", message = "Os jogadores na mesma dupla devem ser diferentes." } } });
            }

            var jogador1 = await _dbContext.Jogadores.FindAsync(dupla.Jogador1.Id);
            var jogador2 = await _dbContext.Jogadores.FindAsync(dupla.Jogador2.Id);

            if (jogador1 == null || jogador2 == null)
            {
                return BadRequest(new { errors = new[] { new { field = "NotExist", message = "Um ou ambos os jogadores não existem." } } });
            }

            dupla.Jogador1 = jogador1;
            dupla.Jogador2 = jogador2;

            // Adicionar a nova dupla ao contexto
            _dbContext.Duplas.Add(dupla);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDupla), new { id = dupla.Id }, dupla);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDupla(int id, Dupla dupla)
        {
            string message = string.Empty;
            if (id != dupla.Id)
            {
                return BadRequest();
            }

            var existingDupla = await _dbContext.Duplas.FindAsync(id);

            if (existingDupla == null)
            {
                return NotFound();
            }
            if (string.IsNullOrEmpty(dupla.Nome))
            {
                return BadRequest(new { errors = new[] { new { field = "Name", message = "Nome da dupla obrigatório" } } });
            }

            var result = await _dbContext.Duplas
                            .Where(d => d.Id != dupla.Id && d.FlAtivo && (d.Jogador1.Id == dupla.Jogador1.Id || d.Jogador1.Id == dupla.Jogador2.Id))
                            .Include(j => j.Jogador2)
                            .ToListAsync();

            if (result.Count > 0)
            {
                if (result.Count == 1)
                {
                    var d = result.First();
                    message = $"O jogador {dupla.Jogador1.Nome} pertence à dupla {d.Nome}";
                    if (d.Jogador2 != null)
                    {
                        message += $" e o jogador {dupla.Jogador2.Nome} pertence à mesma dupla.";
                    }
                }
                else if (result.Count == 2)
                {
                    message = $"O jogador {dupla.Jogador1.Nome} pertencem à dupla {result[0].Nome} e o jogador {dupla.Jogador2.Nome} pertence à dupla {result[1].Nome}.";
                }
                return BadRequest(new { errors = new[] { new { field = "Pertence", message} } });
            }


            // Atualiza manualmente os campos desejados
            existingDupla.Nome = dupla.Nome;
            existingDupla.Jogador1 = dupla.Jogador1;
            existingDupla.Jogador2 = dupla.Jogador2;
            existingDupla.Pontos = dupla.Pontos;
            existingDupla.PontosBatida = dupla.PontosBatida;
            existingDupla.PontosSofridos = dupla.PontosSofridos;
            existingDupla.FlAtivo = dupla.FlAtivo;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DuplaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Dupla atualizada com sucesso!" });
        }

        private bool DuplaExists(int id)
        {
            return _dbContext.Duplas.Any(d => d.Id == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDupla(int id)
        {
            var dupla = await _dbContext.Duplas.FindAsync(id);

            if (dupla == null)
            {
                return NotFound();
            }
            _dbContext.Duplas.Remove(dupla);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Dupla deletada com sucesso!" });
        }
    }
}
