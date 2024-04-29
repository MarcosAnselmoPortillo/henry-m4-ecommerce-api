//Elimina los duplicados, elimina los espacios en blanco al principio del string, convierte la primera letra a mayúscula y el resto a minúscula, y asegura que solo haya un espacio en blanco entre palabras.
export function formatStrings(strings: string[]): string[] {
  const formattedStrings: string[] = [];

  strings.forEach((str) => {
    const formattedStr = formatString(str);

    // Eliminar duplicados
    if (!formattedStrings.includes(formattedStr)) {
      formattedStrings.push(formattedStr);
    }
  });

  return formattedStrings;
}

export function formatString(str: string): string {
  const formattedStr = str
    .trim() // Eliminar espacios en blanco al inicio y al final
    .toLowerCase() // Convertir todas las letras a minúsculas
    .split(/\s+/) // Dividir el string en palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Convertir la primera letra de cada palabra a mayúscula
    .join(' '); // Unir las palabras con un solo espacio en blanco
  return formattedStr;
}
