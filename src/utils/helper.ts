export function convertObjectToParams(object: Record<string, string>) {
  let queryString = "";

  for (const [key, value] of Object.entries(object)) {
    if (value) {
      const query = value.replace(/\s+/g, "");
      if (queryString.length > 0) {
        queryString += ` ${key}:${query}`;
      } else {
        queryString += `${key}:${query}`;
      }
    }
  }

  return queryString;
}
