import Database from '../Database/DBconfig.js';



async function exibirEvent() {
    const db = await Database.connect();

    const selectSql = `
        SELECT * FROM eventos
    `;
    const eventos = await db.all(selectSql);
    return eventos;
}

async function exibirEditais() {
    const db = await Database.connect();

    const selectSql = `
        SELECT * FROM Editais
    `;
    const editais = await db.all(selectSql);
    return editais;
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
