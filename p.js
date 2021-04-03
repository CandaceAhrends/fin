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

const test = permute(arr1);

const arr = [["abc"], "abc", "ccc", "ccc", "lkl", "sdfa"];

const t = arr.flatMap((a) => a);
console.log(t);
