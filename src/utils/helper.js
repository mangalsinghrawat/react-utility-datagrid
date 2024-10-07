export function sortAscending(arr) {
    return arr.sort((a, b) => {
      // Handle different types of data
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else {
        // Convert other types to string for comparison
        return String(a).localeCompare(String(b));
      }
    });
  }

export function sortDescending(arr) {
    return arr.sort((a, b) => {
      // Handle different types of data
      if (typeof a === 'number' && typeof b === 'number') {
        return b - a;
      } else if (typeof a === 'string' && typeof b === 'string') {
        return b.localeCompare(a);
      } else {
        // Convert other types to string for comparison
        return String(b).localeCompare(String(a));
      }
    });
}
  


export const Operators= {
  string: [
    "contains",
    "equals",
    "starts with",
    "ends with",
    "is empty",
  ],
  number: [
    "=",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
    "is empty",
    "is not empty",
  ],
  boolean: ["is"],
  date: [
    "is",
    "is not",
    "is after",
    "is before",
    "is empty",
  ],
};
