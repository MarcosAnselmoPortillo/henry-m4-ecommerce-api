export function removeDuplicates(array: { id: string }[]) {
    const uniqueIds = new Set<string>();
    return array.filter(obj => {
      if (uniqueIds.has(obj.id)) {
        return false;
      } else {
        uniqueIds.add(obj.id);
        return true;
      }
    });
  }