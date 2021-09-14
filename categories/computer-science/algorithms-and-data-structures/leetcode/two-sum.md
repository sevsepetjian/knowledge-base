# Two Sum
---

#### Problem

Given an array of integers *nums* and an integer *target*, return *indices* of the two numbers such thaty they add up to *target*.

#### Example 1:

    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Output: Because nums[0] + nums[1] == 9, we return [0, 1].

#### Example 2:

    Input: nums = [3,2,4], target = 6
    Output: [1,2]

#### Example 3:

    Input: nums = [3,3], target = 6
    Output: [0,1]

#### My Solution

    class Solution:
        def twoSum(self, nums: List[int], target: int) -> List[int]:
            if len(nums) <= 2:
                return [0, 1]

            dic = {}

            for index, value in enumerate(nums):
                dic[value] = index

            for index, value in enumerate(nums):
                lookup_value = target - value

                if lookup_value in dic and index != dic[lookup_value]:
                    return [index, dic[lookup_value]]

The way I approached this problem was to use a python dictionary that holds each value and it's index in the array as a key/value pair. After, we check to see if the difference between the current value and the target value exists inside the dictionary. If it does and the current index doesn't equal to the index of the lookup value than we go ahead and return the pair. This avoids errors in certain input values such as in Example 2, where the *target value - the current value = the current value*. This returns [0, 0] as the output, however the correct output as we can see is [1, 2]. Finally, the worst case time complexity of this algorthm is *O(n)*. 

You can find the whole problem [here](https://leetcode.com/problems/two-sum/).