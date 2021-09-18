# Missing Number
---

Given an array *nums* containing *n* distinct numbers in the range *[0, n]*, return the only number in the range that is missing from the array.

#### Example 1:

    Input: nums = [3,0,1]
    Output: 2
    Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

#### Example 2:

    Input: nums = [0,1]
    Output: 2
    Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

#### Example 3:

    Input: nums = [9,6,4,2,3,5,7,0,1]
    Output: 8
    Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.

#### Example 4:

    Input: nums = [0]
    Output: 1
    Explanation: n = 1 since there is 1 number, so all numbers are in the range [0,1]. 1 is the missing number in the range since it does not appear in nums.
 
#### My Solution

    class Solution:
        def missingNumber(self, nums: List[int]) -> int:
            n = len(nums)

            if 0 not in nums:
                return 0

            if n == 1:
                if nums[0] == 0:
                    return 1
                else:
                    return 0

            if n not in nums:
                return n

            nums.sort()

            for i in range(n - 1):
                if nums[i + 1] - nums[i] > 1:
                    missing_number = nums[i] + 1

                    return missing_number

The way I approached this problem was to first take care of any of the edges cases that may arise. If there were no edge cases I first sorted the array, knowing that in that situation if *nums[i + 1] - nums[i] > 1* than adding *1* to *nums[i]* would give me the missing number. Few hints in the problem such as *distinct numbers* and *return the only number in the range that is missing from the array*, made this kind of solution possible. Because I decided to sort the array, the time complexity of this algorithm is *O(nlogn)*.

You can find the whole problem [here](https://leetcode.com/problems/missing-number/).