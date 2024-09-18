import Database from './DBconfig.js';
 
async function up() {
  const db = await Database.connect();
 
  const EventSql = `   
            CREATE TABLE IF NOT EXISTS Eventos (
                EventoID INTEGER PRIMARY KEY AUTOINCREMENT,
                NomeEvento VARCHAR(255) NOT NULL,
                Descricao TEXT NOT NULL,
                DataHora DATETIME NOT NULL,
                Localizacao VARCHAR(255) NOT NULL,
                Organizador VARCHAR(255) NOT NULL,
                InfoIngresso VARCHAR(255),
                ImagemCartaz VARCHAR(255),
                DataPublicacao DATE NOT NULL               
            )`;
  
  const InscrSql = `   
            CREATE TABLE IF NOT EXISTS InscricoesEventos (
                InscricaoEventoID INTEGER PRIMARY KEY AUTOINCREMENT,
                EventoID INTEGER NOT NULL,
                UsuarioID INTEGER NOT NULL,
                DataInscricao DATETIME NOT NULL,
                FOREIGN KEY (EventoID) REFERENCES eventos(EventoID)
                FOREIGN KEY (UsuarioID) REFERENCES usuarios(UsuarioID)

            )`;
    
    const EditaisSql = `CREATE TABLE IF NOT EXISTS Editais (
                EditalID INTEGER PRIMARY KEY AUTOINCREMENT,
                Titulo VARCHAR(255) NOT NULL,
                Descricao TEXT NOT NULL,
                CategoriaArtistica DATE NOT NULL,
                PrazoInscricao DATE NOT NULL,
                DetalhesFinanciamento VARCHAR(255),
                CritériosSelecao TEXT NOT NULL,
                ProcessoInscricao TEXT NOT NULL,
                Organizador VARCHAR(255) NOT NULL
            )`;

    const InscricoesEditaisSql = `CREATE TABLE IF NOT EXISTS InscricoesEditais (
                InscricaoEditalID INTEGER PRIMARY KEY AUTOINCREMENT,
                EditalID INTEGER NOT NULL,
                UsuarioID INTEGER NOT NULL,
                Status ENUM(4) NOT NULL,
                DataInscricao DATE NOT NULL,
                Feedback TEXT,
                FOREIGN KEY (EditalID) REFERENCES editais(EditalID)
                FOREIGN KEY (UsuarioID) REFERENCES usuarios(UsuarioID)
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
  await db.run(InscrSql);
  await db.run(EditaisSql);
  await db.run(InscricoesEditaisSql);
  //await db.run(semanasql)
}
 
export default { up };