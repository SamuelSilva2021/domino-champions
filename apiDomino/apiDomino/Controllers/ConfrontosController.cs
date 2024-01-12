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
    public class ConfrontosController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Random _random = new Random();

        public ConfrontosController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Confronto>>> GetConfronto()
        {
            var confrontos = await _dbContext.Confrontos
                .Where(c => c.FlConcluido == 0)
                .ToListAsync();

            return confrontos;
        }

        [HttpGet("concluido/{concluido}")]
        public async Task<ActionResult<IEnumerable<Confronto>>> GetConfrontoConcluido(bool concluido)
        {
            if (concluido)
            {
                var confrontos = await _dbContext.Confrontos
                .Where(c => c.FlConcluido == 1)
                .ToListAsync(); 
                return confrontos;
            }
            else
            {
                var confrontos = await _dbContext.Confrontos
                .Where(c => c.FlConcluido == 0)
                .ToListAsync();
                return confrontos;
            }
 
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConfronto(int id)
        {
            var confronto = await _dbContext.Confrontos.FindAsync(id);

            if (confronto == null)
                return NotFound();

            return Ok(confronto);
        }
        [HttpPost]
        public async Task<IActionResult> PostConfronto()
        {
            try
            {
                var duplas = await _dbContext.Duplas.ToListAsync();

                if (duplas.Count < 2)
                {
                    return BadRequest(new { error = "Número insuficiente de duplas para criar confrontos." });
                }

                var confrontos = new List<Confronto>();

                for(int i = 0; i < duplas.Count -1; i++)
                {
                    for(int j = i + 1; j < duplas.Count; j++)
                    {
                        var confronto = new Confronto
                        {
                            Dupla1  = duplas[i],
                            PtsBtdDp1Jogador1 = 0,
                            PtsBtdDp1Jogador2 = 0,
                            Dupla2 = duplas[j],
                            PtsBtdDp2Jogador1 = 0,
                            PtsBtdDp2Jogador2 = 0,
                            VencedorId = 0,
                            FlConcluido = 0,
                        };
                        confrontos.Add(confronto);
                    }
                }

                ShuffleConfrontos(confrontos);

                _dbContext.Confrontos.AddRange(confrontos);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetConfronto), confrontos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao criar confrontos" });
            }
        }
        private void ShuffleConfrontos(List<Confronto> confrontos)
        {
            int n = confrontos.Count;
            while (n > 1)
            {
                n--;
                int k = _random.Next(n + 1);
                Confronto value = confrontos[k];
                confrontos[k] = confrontos[n];
                confrontos[n] = value;
            }
        }
        public static T DeepClone<T>(T obj)
        {
            if (obj == null)
                return default;

            // Cria uma nova instância do mesmo tipo do objeto original
            T clone = (T)Activator.CreateInstance(obj.GetType());

            // Obtém todas as propriedades do objeto original
            PropertyInfo[] properties = obj.GetType().GetProperties();

            // Copia os valores das propriedades para o clone
            foreach (PropertyInfo property in properties)
            {
                if (property.CanWrite)
                {
                    object value = property.GetValue(obj);
                    property.SetValue(clone, value);
                }
            }

            return clone;
        }
        //[HttpPost("final")]
        //public async Task<IActionResult> PostConfrontoFinal(Confronto confronto)
        //{
        //    try
        //    {
        //        for (int i = 0; i < 3; i++)
        //        {
        //            // Crie uma nova instância do objeto Confronto usando a clonagem profunda
        //            Confronto novaPartida = DeepClone(confronto);

        //            // Adicione a nova partida ao contexto do banco de dados
        //            _dbContext.Confrontos.Add(novaPartida);
        //        }

        //        // Salve as alterações no banco de dados
        //        await _dbContext.SaveChangesAsync();

        //        // Retorne a lista das três partidas salvas com o status 201 (Created)
        //        List<Confronto> partidasSalvas = await _dbContext.Confrontos
        //                                        .Where(c=> c.FlFinal==1)
        //                                        .ToListAsync();
        //        return CreatedAtAction(nameof(GetConfronto), partidasSalvas);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Em caso de erro, retorne um erro de servidor com o status 500 (Internal Server Error)
        //        return StatusCode(500, new { error = "Erro ao salvar as partidas" });
        //    }
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateConfronto(int id, Confronto confronto)
        //{

        //    var existingConfroto = await _dbContext.Confrontos.FindAsync(id);

        //    if (existingConfroto == null)
        //    {
        //        return NotFound();
        //    }

        //    // Atualiza manualmente os campos desejados
        //    existingConfroto.PontosDupla1 = confronto.PontosDupla1;
        //    existingConfroto.Dupla1Jogador1Pontos = confronto.Dupla1Jogador1Pontos;
        //    existingConfroto.Dupla1Jogador2Pontos = confronto.Dupla1Jogador2Pontos;
        //    existingConfroto.PontosDupla2 = confronto.PontosDupla2;
        //    existingConfroto.Dupla2Jogador1Pontos = confronto.Dupla2Jogador1Pontos;
        //    existingConfroto.Dupla2Jogador2Pontos = confronto.Dupla2Jogador2Pontos;
        //    existingConfroto.VencedorId = confronto.VencedorId;
        //    existingConfroto.FlConcluido = confronto.FlConcluido;

        //    int[] jogadorIds = { confronto.Dupla1Jogador1Id, confronto.Dupla1Jogador2Id, confronto.Dupla2Jogador1Id, confronto.Dupla2Jogador2Id };
        //    int[] jogadorPontos = { confronto.Dupla1Jogador1Pontos, confronto.Dupla1Jogador2Pontos, confronto.Dupla2Jogador1Pontos, confronto.Dupla2Jogador2Pontos };

        //    int[] duplaIds = { confronto.Dupla1Id, confronto.Dupla2Id};
        //    int[] duplaPontos = { confronto.PontosDupla1, confronto.PontosDupla2};

        //    //Lógica para adicionar pontos aos jogadores
        //    var jogadores = await _dbContext.Jogadores
        //                    .Where(j => jogadorIds.Contains(j.Id))
        //                    .ToListAsync();

        //    for (int i = 0; i < jogadores.Count; i++)
        //    {
        //        var jogador = jogadores.Where(j => j.Id == jogadorIds[i]).FirstOrDefault();
        //        jogador.Pontos += jogadorPontos[i];
        //    }

        //    //Lógica para adicionar pontos as duplas
        //    var duplas = await _dbContext.Duplas
        //                 .Where(d=> duplaIds.Contains(d.Id))
        //                 .ToListAsync();

        //    for (int i = 0; i < duplas.Count; i++)
        //    {
        //        var dupla = duplas.Where(d => d.Id == duplaIds[i]).FirstOrDefault();
        //        dupla.PontosBatida += duplaPontos[i];
        //        dupla.PartidasConcluidas += 1;
        //    }
        //    //Lógica para adicionar pontos sofridos as duplas
        //    var dupla1 = duplas.Where(d => d.Id == confronto.Dupla1Id).FirstOrDefault();
        //    dupla1.PontosSofridos += duplaPontos[1];
        //    var dupla2 = duplas.Where(d => d.Id == confronto.Dupla2Id).FirstOrDefault();
        //    dupla2.PontosSofridos += duplaPontos[0];
           
        //    var vencedor = duplas.Where(d => d.Id == confronto.VencedorId).FirstOrDefault();
        //    vencedor.Pontos += 3;
            
        //    try
        //    {
        //        await _dbContext.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(new { message = "Confronto finalizado com sucesso!" });
        //}
    }
}

