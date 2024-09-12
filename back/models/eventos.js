import Database from '../Database/DBconfig.js';



async function exibirEvent() {
    const db = await Database.connect();

    const selectSql = `
        SELECT * FROM eventos
    `;
    const eventos = await db.all(selectSql);
    return eventos;
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


export { /*exibirSemana, getUserFromSemana,*/ exibirEvent };
