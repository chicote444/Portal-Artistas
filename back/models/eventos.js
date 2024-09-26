import prisma from '../Database/DBconfig.js';



async function exibirEvent() {
    const db = await prisma.eventos.findMany();

    const selectSql = `
        SELECT * FROM Eventos
    `;
    return db;
}

async function insertEvent(evento) {
    const db = await prisma.eventos.findMany();
    const insertSql = `
        INSERT INTO Eventos (NomeEvento, Descricao, DataHora, Localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.run(insertSql, [evento.nome, evento.descricao, evento.data, evento.hora, evento.local, evento.valor]);
}

async function exibirEditais() {
    const db = await prisma.editais.findMany();

    const selectSql = `
        SELECT * FROM Editais
    `;
    if (db.length > 0) {
        return db;
    }
}

async function exibirInscricoesEventos() {
    const db = await Database.connect();

    const selectSql = `
        SELECT * FROM InscricoesEventos
    `;
    const inscricoes = await db.all(selectSql);
    return inscricoes;
}

async function exibirInscricoesEditais() {
    const db = await Database.connect();

    const selectSql = `
        SELECT * FROM InscricoesEditais
    `;
    const inscricoes = await db.all(selectSql);
    return inscricoes;
}

async function atualizarEvent(evento) {
    const db = await Database.connect();
    const updateSql = `
        UPDATE eventos
        SET ImagemCartaz = ?
        WHERE id = ?
    `;
    await db.run(updateSql, [evento.nome, evento.descricao, evento.data, evento.hora, evento.local, evento.valor, evento.id]);
}



async function exibirSemana() {
  const db = await Database.connect();

    const selectSql = `
        SELECT * FROM semana
    `;

    const semana = await db.all(selectSql);
    return semana;

}
    
/*async function getUserFromSemana(filhoId) {
  const db = await Database.connect();
  const selectSql = `SELECT useres.* FROM useres
          JOIN semana ON useres.id = semana.user_id
          WHERE semana.id = ?`;
    const rel = await db.all(selectSql, [filhoId]);
    return rel;
}

getUserFromSemana(1);*/


export { /*exibirSemana, getUserFromSemana,*/ exibirEvent, exibirEditais, exibirInscricoesEventos, exibirInscricoesEditais, atualizarEvent };
