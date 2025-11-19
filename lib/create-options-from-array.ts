export const createOptionsFromArray = (array: string[]) => {
  return array.map((item) => ({
    label: item.charAt(0).toUpperCase() + item.slice(1),
    value: item,
  }));
};
