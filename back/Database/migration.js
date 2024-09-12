import Database from './DBconfig.js';
 
async function up() {
  const db = await Database.connect();
 
  const EventSql = `   
            CREATE TABLE IF NOT EXISTS eventos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                popularidade INTEGER NOT NULL,
                encerramento DATE,
                descricao TEXT NOT NULL
                
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
  await db.run(EventSql);
  //await db.run(semanasql)
}
 
export default { up };