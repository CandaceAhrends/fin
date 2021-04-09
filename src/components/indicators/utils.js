export const movingAvg = (data) => {
  const len = data.length;
  return data
    .reduce((avg, d) => {
      avg += d.open;
      return avg / len;
    }, 0)
    .toFixed(2);
};
