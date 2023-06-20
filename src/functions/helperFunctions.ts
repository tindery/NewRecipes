export const isObjectEmpty = (obj: Object): boolean => !Object.keys(obj).length;

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// returns new array
export const removeItemFromArray = <T>(
  array: T[],
  item: T
): T[] => {
  let newArray = [...array];
  const index = newArray.indexOf(item)
  if (index > -1) {
    newArray.splice(index, 1);
  }
  return newArray;
};
