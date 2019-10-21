function longestCommonSubstring(s1, s2) {
    const dp = []
    let max = 0

    for (let i = 0; i < s1.length; i++) {
        dp[i] = Array(s2.length).fill(0)
        console.log(dp[i])
    }

    for (let i = 1; i < s1.length + 1; i++) {
        for (let j = 1; j < s2.length + 1; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                max = Math.max(max, dp[i][j]);
            }
        }
    }

    return max
}

longestCommonSubstring("hish", "fish")