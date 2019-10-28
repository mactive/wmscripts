/**
 * 给定一个字符串, 找出不含有重复字符的最长子串的长度。
 * 给定 "abcabcbb", 没有重复字符的最长子串是 "abc", 那么长度就是 3。
 * 给定 "bbbbb", 最长的子串就是 "b", 长度是 1。
 * 给定 "pwwkew", 最长子串是 "wke", 长度是 3。请注意答案必须是一个子串, "pwke" 是子序列而不是子串。
 */

/**
 * 
 * @param {*} s 
 * @returns {number}
 */
var lengthOfLongestSubString = function (s) {
    if (s.length < 1) {
        return 0
    }
    let i = 0, j = 1, longest = 1
    while (j < s.length) {
        // 滑动窗口
        let slideWindow = s.slice(i, j)
        let nextElement = s.charAt(j)
        if (slideWindow.indexOf(nextElement) > -1) {
            console.log(i, j);
            i += slideWindow.indexOf(nextElement) + 1
        } else {
            longest = Math.max(j - i + 1, longest)
        }
        j++
    }
    return longest
}

console.log(lengthOfLongestSubString("abcabcbb"));