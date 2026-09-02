export const seed = [
    {
      nomeSolicitante: "Carlos",
      bloco: "Bloco A",
      sala: "101",
      data: "2026-09-05",
    },
    {
        nomeSolicitante: "George",
        bloco: "Bloco B",
        sala: "101",
        data: "2026-09-06",
      },
      {
        nomeSolicitante: "Kleyton",
        bloco: "Bloco A",
        sala: "102",
        data: "2026-09-07",
      }
  ];
  
  export const blocos = [
    {
      id: 0,
      nome: "Bloco A",
      salas: [
        {
          id: 101,
          nome: "Sala 101",
          descricao: "Laboratório de Informática",
          reservas: []
        },
        {
            id: 102,
            nome: "Sala 102",
            descricao: "Laboratório de Informática",
            reservas: []
          }
      ]
    },

    {
        id: 1,
        nome: "Bloco B",
        salas: [
          {
            id: 101,
            nome: "Sala 101",
            descricao: "Sala de Aula",
            reservas: []
          },
          {
              id: 102,
              nome: "Sala 102",
              descricao: "Sala de Aula",
              reservas: []
            }
        ]
      }
  ];