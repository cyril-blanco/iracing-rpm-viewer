/**
 * Simple object equality
 * @param x
 * @param y
 * @return boolean
 */
export const isEqual = (x: any, y: any) => {
  return Object.keys(x).every((key: string) => x[key] === y[key]);
};
