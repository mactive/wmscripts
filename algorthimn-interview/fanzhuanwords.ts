// https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/submissions/

var input = "the sky is blue"
var input2 = "  hello world! I am    maccc    "

var reserveWordsRegex = function(s: String) {
    let res = s.trim()
    let tt: String[] = res.replace(/\s+/g, " ").split(" ")
    return tt.reverse().join(" ")
}

var reserveWords = function (s) {
    let tmp = s.split(" ")
    console.log(tmp)

    return tmp
    .filter(Boolean)
    .map(item => String.prototype.trim.call(item))
    .reverse()
    .join(" ");
}
const result = reserveWords(input)
console.log(reserveWordsRegex(input2))