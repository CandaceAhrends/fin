const arr1 = ["a", "b", "c", "D"];

const permute = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  return arr.reduce((r, item, idx) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];

    const permuted = permute(rest);

    r = [
      ...r,
      permuted.map((p) => {
        return item + p;
      }),
    ];

    return r;
  }, []);
};

///const test = permute(arr1);

const arr = [["abc"], "abc", "ccc", "ccc", "lkl", "sdfa"];

const t = arr.flatMap((a) => a);

const numb = "2,4,5,3,2,2,9,9";

const test = Array.from(numb.replaceAll(",", ""));
test.sort((a, b) => a - b);

const mid = Math.floor(test.length / 2);
const isEven = test.length % 2 === 0;
if (isEven) {
  console.log("mid points are ", test[mid - 1], test[mid]);
} else {
  console.log("mid point is", test[mid]);
}

console.log(mid, isEven, test.length, test);
