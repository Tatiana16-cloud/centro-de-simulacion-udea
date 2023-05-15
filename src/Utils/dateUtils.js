export function formatDate(dateString) {
    if(!dateString) return '-'
    let date = new Date(dateString);
    const timestamp = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }