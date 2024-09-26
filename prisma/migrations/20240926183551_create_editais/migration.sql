-- CreateTable
CREATE TABLE "Editais" (
    "EditalID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Titulo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "CategoriaArtistica" TEXT NOT NULL,
    "PrazoInscricao" DATETIME NOT NULL,
    "DetalhesFinanciamento" DATETIME,
    "CriteriosSelecao" TEXT NOT NULL,
    "ProcessoInscricao" TEXT NOT NULL,
    "Organizador" TEXT NOT NULL
);
