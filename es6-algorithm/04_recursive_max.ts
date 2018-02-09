const max = (list: number[]) => {
  if(list.length === 2) {
    return list[0] > list[1] ? list[0]: list[1];
  }
  const subMax:number = max(list.slice(1));
  return list[0] > subMax ? list[0]: subMax;
}

console.log(max([1,2,3,4,13]))