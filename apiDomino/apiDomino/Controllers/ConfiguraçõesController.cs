using apiDomino.Data;
using apiDomino.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiDomino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfiguraçõesController: ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ConfiguraçõesController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPut]
        [Route("clear-points-playes")]
        public async Task<IActionResult> ClearPointAllPlayers()
        {
            try
            {
                var players = await _dbContext.Jogadores.ToListAsync();
                if (players.Count > 0)
                {
                    foreach (var player in players)
                    {
                        player.Pontos = 0;
                        await _dbContext.SaveChangesAsync();
                    }
                }
                return Ok(new {message = "Pontos zerados com sucesso"});
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = $"Erro ao zerar pontos dos jogadores: {ex.Message}"});
                throw;
            }
            
        }
    }
}
