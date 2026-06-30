-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "projectType" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "languagePreference" TEXT NOT NULL,
    "userLoad" TEXT NOT NULL,
    "realTime" TEXT NOT NULL,
    "dataNeed" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "resultJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
