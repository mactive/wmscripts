var letterCombinations = function (digits) {
    var storage = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    var len = digits.length;
    var result = []
    var letters = []
    function _generate(i, str) {
        // terminator
        if (i == len) {
            result.push(str);
            return;
        }
        // process
        // drill down
        var tmp = storage[parseInt(digits[i]) - 2]
        for (var r = 0; r < tmp.length; r++) {
            console.log(i, r, str, tmp);
            _generate(i + 1, str + tmp[r]);
        }
    }
    // 启动递归
    _generate(0, '');
    return result;
};

console.log(letterCombinations("3"))