# Majority Element
---

Given an array nums of size *n*, return the majority element.

The majority element is the element that appears more than *n / 2* times. You may assume that the majority element always exists in the array.

#### Example 1:

    Input: nums = [3,2,3]
    Output: 3

#### Example 2:

    Input: nums = [2,2,1,1,1,2,2]
    Output: 2

#### My Solution

    class Solution:
        def majorityElement(self, nums: List[int]) -> int:
            # add items to dict, get max value from dict key = num, value = how many nums in arr
            dic = {}

            for num in nums:
                if num in dic:
                    dic[num] += 1
                else:
                    dic[num] = 1

            majority_element = max(zip(dic.values(), dic.keys()))[1]

            return majority_element

The way I approached this problem was to use a python dictionary to hold all the different numbers of the array as the keys, and the amount of times those numbers appear in the array as its value. Lastly, we use pythons max() and zip() functions to return the key with the maximum value as the solution to the problem. This algorithm runs in *O(n)* complexity.

You can find the whole problem [here](https://leetcode.com/problems/majority-element/).