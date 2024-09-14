import Database from './DBconfig.js';
 
async function up() {
  const db = await Database.connect();
 
  const EventSql = `   
            CREATE TABLE IF NOT EXISTS eventos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT NOT NULL
                DataHora DATETIME NOT NULL,
                localizacao VARCHAR(255) NOT NULL,
                Organizador VARCHAR(255) NOT NULL,
                InfoIngresso VARCHAR(255),
                ImagemCartaz VARCHAR(255),
                DataPublicacao DATETIME NOT NULL,                
            )`;
  
  const InscrSql = `   
            CREATE TABLE IF NOT EXISTS inscricoesEventos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                evento_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                DataInscricao DATE NOT NULL,
                FOREIGN KEY (evento_id) REFERENCES eventos(id),
                FOREIGN KEY (user_id) REFERENCES useres(id),

            )`;
  
  /*const semanasql = `
            CREATE TABLE IF NOT EXISTS semana (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                dia INTEGER NOT NULL,
                materia TEXT NOT NULL,
                assunto TEXT,
                assunto2 TEXT,
                assunto3 TEXT,
                semana INTEGER NOT NULL,
                user_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES useres(id)
            )`*/
  await db.run('PRAGMA foreign_keys = ON;');
  await db.run(EventSql, InscrSql);
  //await db.run(semanasql)
}
 
export default { up };