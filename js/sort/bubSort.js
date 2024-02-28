//冒泡排序
function bubSort(data) {
  let l = data.length;
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      let temp = data[i];
      if (data[i] > data[j]) {
        data[i] = data[j];
        data[j] = temp;
      }
    }
  }
  return data
}
console.log(bubSort([1,5,2,3,9]));