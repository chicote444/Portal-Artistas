import Database from './DBconfig.js';
import fs from "fs";

async function up() {
  const data = JSON.parse(fs.readFileSync("back/Database/evento.json", "utf-8"));
  //const data2 = JSON.parse(fs.readFileSync("programa_estudos/src/database/program.json", "utf-8"));
  const db = await Database.connect();
  console.log(data);

  const insertSql = `
    INSERT INTO Eventos (NomeEvento, Descricao, DataHora, Localizacao, Organizador, InfoIngresso, ImagemCartaz, DataPublicacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const student of data.Eventos) {
    await db.run(insertSql, [student.nome, student.descricao, student.ataHora, student.localizacao, student.Organizador, student.InfoIngresso, student.ImagemCartaz, student.DataPublicacao]);
    console.log(student.nome);
  }

  const insertSql2 = `
    INSERT INTO Editais (Titulo, Descricao, CategoriaArtistica, PrazoInscricao, DetalhesFinanciamento, CritériosSelecao, ProcessoInscricao, Organizador)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const student of data.Editais) {
    await db.run(insertSql2, [student.Titulo, student.Descricao, student.CategoriaArtistica, student.PrazoInscricao, student.DetalhesFinanciamento, student.CritériosSelecao, student.ProcessoInscricao, student.Organizador]);
    console.log(student.Titulo);
  };

  const insertSql3 = `
    INSERT INTO InscricoesEventos (EventoID, UsuarioID, DataInscricao)
    VALUES (?, ?, ?)
  `;

  for (const student of data.InscricoesEventos) {
    await db.run(insertSql3, [student.EventoID, student.UsuarioID, student.DataInscricao]);
    console.log(student.EventoID);
  };

  const insertSql4 = `
    INSERT INTO InscricoesEditais (EditalID, UsuarioID, Status, DataInscricao, Feedback)
    VALUES (?, ?, ?, ?, ?)
  `;
  let x = -1;
  for (const student of data.InscricoesEditais) {
    
    await db.run(insertSql4, [student.EditalID, student.UsuarioID, student.Status[x +=1], student.DataInscricao, student.Feedback]);
    console.log(student.EditalID);
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