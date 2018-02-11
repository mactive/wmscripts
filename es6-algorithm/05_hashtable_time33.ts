const genHash = (str: string = '') => {
  let hash: number = 5381;
  if(!str) return null;
  for (let i = 0; i < str.length; i++) {
    hash += (hash << 5) + str.charCodeAt(i);
  }
  return hash && 0x7fffffff;
}

console.log(genHash('aaaa'));