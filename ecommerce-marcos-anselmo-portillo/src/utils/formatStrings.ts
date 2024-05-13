export function formatStrings(strings: string[]): string[] {
  const formattedStrings: string[] = [];

  strings.forEach((str) => {
    const formattedStr = formatString(str);

    if (!formattedStrings.includes(formattedStr)) {
      formattedStrings.push(formattedStr);
    }
  });

  return formattedStrings;
}

export function formatString(str: string): string {
  const formattedStr = str
    .trim() 
    .toLowerCase() 
    .split(/\s+/) 
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
  return formattedStr;
}
