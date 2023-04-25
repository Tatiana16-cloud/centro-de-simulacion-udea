export function filterByWord(arr, palabra) {
    const regex = new RegExp(`^${palabra}`, 'i');
    return arr.filter(obj => {
      for (let key in obj) {
        if (typeof obj[key] === 'string' && regex.test(obj[key])) {
          return true;
        }
      }
      return false;
    });
  }