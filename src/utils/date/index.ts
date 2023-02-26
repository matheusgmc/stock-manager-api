export function getTodayWithoutHours(): string {
  return new Date().toLocaleString("pt-br").split(" ")[0];
}

export const UtilsDate = { getTodayWithoutHours };
