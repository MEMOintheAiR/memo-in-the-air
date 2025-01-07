export function fixToSixDemicalPoints(num: number): number {
  return Number(num.toFixed(6));
}

export function formatDate(date: string): string {
  let newDate: string = new Date(date).toLocaleString("ko-KR", { timeZone: "UTC" });
  return newDate.slice(0, -3);
}
