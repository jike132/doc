//https://blog.csdn.net/qq_52595134/article/details/118943109
function quickSort(arr, l, r) {
  let first = l,
    last = r - 1,
    key = arr[first];
  while (first < last) {
    while (first < last && arr[last] >= key) {
      --last;
    }
    arr[first] = arr[last];
    while (first < last && arr[first] < key) {
      ++first;
    }
    arr[last] = arr[first];
  }
  arr[first] = key;
  if (first > l) {
    quickSort(arr, l, first);
  }
  if (first + 1 < r) {
    quickSort(arr, first + 1, r);
  }

  return arr;
}
let a = [1, 7, 2, 3, 4, 0];
console.log(quickSort(a, 0, a.length ));
