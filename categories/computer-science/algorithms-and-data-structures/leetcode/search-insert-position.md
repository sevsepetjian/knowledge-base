# Search Insert Position
---

#### Problem 

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with *O(logn)* runtime complexity.

#### Example 1:

    Input: nums = [1,3,5,6], target = 5
    Output: 2

#### Example 2:

    Input: nums = [1,3,5,6], target = 2
    Output: 1

#### Example 3:

    Input: nums = [1,3,5,6], target = 7
    Output: 4

#### Example 4:

    Input: nums = [1,3,5,6], target = 0
    Output: 0

#### Example 5:

    Input: nums = [1], target = 0
    Output: 0

#### My Solution

    class Solution:
        def searchInsert(self, nums: List[int], target: int) -> int:
            if target == 0:
                return 0

            if target > nums[len(nums) - 1]:
                nums.append(target)
                return len(nums) - 1

            left = 0
            right = len(nums) - 1

            while left <= right:
                mid = (left + right) // 2

                if nums[mid] == target:
                    return nums.index(target)
                elif target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1

            return left

I recognized by the problem description for a *O(logn)* time complexity, along with the sorted array constraint, that this problem can be solved with [binary search](https://www.geeksforgeeks.org/binary-search/). However, as I haven't written one before I looked up a implementation of it after a few attempts. There is both a iterative and recursive implementation of binary search, this particular one is iterative. The two if statements leading the algorithm take care of the edge cases that were specified in the problem. Like previously mentioned the time complexity of this solution is *O(logn)*.

You can find the whole problem [here](https://leetcode.com/problems/search-insert-position/).