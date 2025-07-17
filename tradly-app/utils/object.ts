/**
 * Checks if all properties of an object have truthy values.
 *
 * @param obj - The object to check, where keys are strings and values can be of any type.
 * @returns `true` if all properties have truthy values, otherwise `false`.
 *
 * @example
 * ```ts
 * isFulfilledObject({ name: "John", age: 30 }); // true
 * isFulfilledObject({ name: "", age: 30 }); // false
 * isFulfilledObject({ name: "Alice", age: 0 }); // false
 * ```
 */
export const isFulfilledObject = (obj?: Record<string, any>): boolean => {
  return obj
    ? Object.keys(obj).length > 0 && Object.values(obj).every(Boolean)
    : false;
};
