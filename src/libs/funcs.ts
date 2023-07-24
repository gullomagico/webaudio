// position will be between 0 and 100
var minp = 0;
var maxp = 10000;
// The result should be between 100 an 10000000
var minv = Math.log10(20);
var maxv = Math.log10(20000);

var scale = (maxv - minv) / (maxp - minp);

export function range2freq(range: number) {
  return Math.round(10 ** (minv + scale * (range - minp)));
}

export function freq2range(freq: number) {
  return (Math.log10(freq) - minv) / scale + minp;
}
