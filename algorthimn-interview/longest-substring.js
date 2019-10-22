// 两个string 的最长公共子串

function LCS(word1, word2) {
  let max = 0;
  let index = 0;
  let lcsarr = new Array(word1.length + 1);
  // 初始化二维数组
  for (let i = 0; i <= word1.length ; i++) {
    lcsarr[i] = new Array(word2.length + 1);
    for (let j = 0; j <= word2.length; j++) {
      lcsarr[i][j] = 0;
    }
  }

  for (let i = 0; i <= word1.length; i++) {
    for (let j = 0; j <= word2.length; j++) {
      if (i == 0 || j == 0) {
        lcsarr[i][j] = 0;
      } else {
        if (word1[i] == word2[j] && word1[i - 1] == word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
        } else {
          lcsarr[i][j] = 0;
        }
      }

      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j];
        index = i;
      }
    }
  }
  console.log(lcsarr);
  console.log(max);
  console.log(index);
  let str = "";
  if (max == 0) {
    return;
  } else {
    for (let i = index - max; i < index; i++) {
      str += word1[i];
    }
    return str;
  }
}

console.log(LCS("abcdc", "bcac"));
// console.log(LCS("12345678", "45678"));
