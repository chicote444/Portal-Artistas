import Database from './DBconfig.js';
import fs from "fs";

async function up() {
  const data = JSON.parse(fs.readFileSync("back/Database/evento.json", "utf-8"));
  //const data2 = JSON.parse(fs.readFileSync("programa_estudos/src/database/program.json", "utf-8"));
  const db = await Database.connect();

  const insertSql = `
    INSERT INTO eventos (nome, descricao, DataHora, localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const student of data) {
    await db.run(insertSql, [student.nome, student.popularidade, student.data_de_encerramento, student.descricao]);
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