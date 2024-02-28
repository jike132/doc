//希尔排序
function shellSort(data) {
  let l = data.length;
  let gap = data.length;
  while (gap > 1) {
    gap = Math.floor(gap / 2);
    if (gap == 0) {
      gap = 1;
    }
    for (let i = 0; i < l - gap; i++) {
      let end = i;
      while (end >= 0) {
        if (data[end + gap] < data[end]) {
          let tem = data[end + gap];
          data[end + gap] = data[end];
          data[end] = tem;
          end--;
        } else {
          break;
        }
      }
    }
  }
  return data;
}
console.log(shellSort([1, 6, 2, 3, 9]));
