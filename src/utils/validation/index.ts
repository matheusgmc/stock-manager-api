export function ObjectIsEmpty(obj: any): boolean {
  return Object.entries(obj).length === 0;
}

export function ObjectKeyIsValid(entity: any, obj: any): boolean {
  return (
    Object.keys(obj).filter((key) =>
      Object.prototype.hasOwnProperty.call(entity, key)
    ).length === 0
  );
}

export const Validation = {
  ObjectIsEmpty,
  ObjectKeyIsValid,
};
