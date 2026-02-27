export const validateQuery = (query: string): boolean => {
  if (!query || typeof query !== "string") return false;

  const trimmed = query.trim().toLowerCase();

  if (!trimmed.startsWith("select")) return false;

  if (trimmed.includes(";")) return false;

  if (trimmed.includes("--") || trimmed.includes("/*")) return false;

  const forbiddenKeywords = ["insert","update","delete","drop","truncate", "alter","create","grant","revoke",];

  for (const keyword of forbiddenKeywords) {
    if (trimmed.includes(keyword)) {
      return false;
    }
  }

  return true;
};