export function filterByWord(arr, palabra) {
    if(!palabra) return arr;
    const regex = new RegExp(`\\b${palabra}`, 'i');
    return arr.filter(obj => {
      for (let key in obj) {
        
        if(key === 'description') console.log(obj['description'],regex.test(obj[key]))
        if(typeof obj[key] === 'number') obj[key] = String(obj[key])
        if (typeof obj[key] === 'string' && regex.test(obj[key])) {
          return true;
        }
      }
      return false;
    });
  }