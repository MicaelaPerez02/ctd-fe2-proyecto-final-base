/**
Capitaliza la primera letra de cada palabra en una cadena de texto.
@param str La cadena de texto a capitalizar.
@returns La cadena de texto con la primera letra de cada palabra capitalizada.
*/

export const capitalize = (str: string): string => {
  return str
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};