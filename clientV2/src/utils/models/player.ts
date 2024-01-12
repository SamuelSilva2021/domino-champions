export interface Player {
    id: number;
    nome: string;
    email?: string;
    apelido?: string;
    pontos: number;
    flAtivo: boolean;
    urlImagem?: string | null;
    titulos: number
  }