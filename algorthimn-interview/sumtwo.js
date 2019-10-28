var twoSum = function(nums, target) {
    var temp = []
    for(var i = 0; i < nums.length; i++) {
        var dif = target - nums[i]
        if(temp[dif] != undefined) {
            console.log('last',dif,nums[i],temp[dif])
            return [temp[dif], i]
        }
        console.log(dif,nums[i],temp[dif])
        temp[nums[i]] = i;
    }
}

console.log(twoSum([11,15,2,7],9))