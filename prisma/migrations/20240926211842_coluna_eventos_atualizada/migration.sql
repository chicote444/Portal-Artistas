/*
  Warnings:

  - The primary key for the `Eventos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `EditalID` on the `Eventos` table. All the data in the column will be lost.
  - Added the required column `EventoID` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Eventos" (
    "EventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NomeEvento" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "DataHora" DATETIME NOT NULL,
    "Localizacao" TEXT NOT NULL,
    "Organizador" TEXT NOT NULL,
    "InfoIngresso" TEXT,
    "ImagemCartaz" TEXT,
    "DataPublicacao" DATETIME NOT NULL
);
INSERT INTO "new_Eventos" ("DataHora", "DataPublicacao", "Descricao", "ImagemCartaz", "InfoIngresso", "Localizacao", "NomeEvento", "Organizador") SELECT "DataHora", "DataPublicacao", "Descricao", "ImagemCartaz", "InfoIngresso", "Localizacao", "NomeEvento", "Organizador" FROM "Eventos";
DROP TABLE "Eventos";
ALTER TABLE "new_Eventos" RENAME TO "Eventos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
