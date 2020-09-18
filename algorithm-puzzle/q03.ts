var maxSubArray = function(nums) {
    let res = nums[0];
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i - 1] > 0) {
            nums[i] += nums[i - 1];
        }
        res = Math.max(res, nums[i]);
    }
    return res;
};
var test = [1,2,-1,4,5,1]
maxSubArray(test)