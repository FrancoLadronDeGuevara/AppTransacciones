export const toArgentinaTime = (dateString) => {
    const date = new Date(dateString);
    const argentinaOffset = -3 * 60;
    const localDate = new Date(date.getTime() + argentinaOffset * 60000);
  
    const day = localDate.getUTCDate().toString().padStart(2, '0');
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const hours = localDate.getUTCHours().toString().padStart(2, '0');
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
  
    return `${day}/${month} ${hours}:${minutes} hs`;
  }