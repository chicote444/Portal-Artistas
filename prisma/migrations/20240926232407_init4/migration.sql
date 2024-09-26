/*
  Warnings:

  - Made the column `DetalhesFinanciamento` on table `Editais` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Editais" (
    "EditalID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Titulo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "CategoriaArtistica" TEXT NOT NULL,
    "PrazoInscricao" DATETIME NOT NULL,
    "DetalhesFinanciamento" TEXT NOT NULL,
    "CriteriosSelecao" TEXT NOT NULL,
    "ProcessoInscricao" TEXT NOT NULL,
    "Organizador" TEXT NOT NULL
);
INSERT INTO "new_Editais" ("CategoriaArtistica", "CriteriosSelecao", "Descricao", "DetalhesFinanciamento", "EditalID", "Organizador", "PrazoInscricao", "ProcessoInscricao", "Titulo") SELECT "CategoriaArtistica", "CriteriosSelecao", "Descricao", "DetalhesFinanciamento", "EditalID", "Organizador", "PrazoInscricao", "ProcessoInscricao", "Titulo" FROM "Editais";
DROP TABLE "Editais";
ALTER TABLE "new_Editais" RENAME TO "Editais";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
