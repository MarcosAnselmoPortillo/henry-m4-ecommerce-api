export function isArrayAllNull(array: any[]): boolean {
    if (!array) return false;
    return array.every(item => item === null);
  }