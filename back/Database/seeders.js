import Database from './DBconfig.js';
import fs from "fs";

async function up() {
  const data = JSON.parse(fs.readFileSync("/workspaces/Portal-Artistas/back/Database/cu.json", "utf-8"));
  //const data2 = JSON.parse(fs.readFileSync("programa_estudos/src/database/program.json", "utf-8"));
  const db = await Database.connect();
  console.log(data);

  const insertSql = `
    INSERT INTO Eventos (NomeEvento, Descricao, DataHora, Localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const student of data) {
    await db.run(insertSql, [student.nome, student.descricao, student.ataHora, student.localizacao, student.Organizador, student.InfoIngresso, student.ImagemCartaz, student.DataPublicacao]);
    console.log(student.nome);
  }

  /*const insertsql2 = `
    INSERT INTO semana (dia, materia, assunto, assunto2, assunto3, semana, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  for (const semana of data2) {
    await db.run(insertsql2, [semana.dia, semana.materia, semana.assuntos[0], semana.assuntos[1], semana.assuntos[2], semana.semana, semana.user_id]);
    console.log(semana.user_id);
  }*/

  
  console.log('Seeding completed.');

}

up().catch(err => {
  console.error('Seeding failed:', err);
});

export default { up };