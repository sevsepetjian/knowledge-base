# Intersection of Two Arrays
---

Given two integer arrays *nums1* and *nums2*, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

#### Example 1:

    Input: nums1 = [1,2,2,1], nums2 = [2,2]
    Output: [2]

#### Example 2:

    Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    Output: [9,4]
    Explanation: [4,9] is also accepted.

#### My Solution

    class Solution:
        def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
            n1 = len(nums1)
            n2 = len(nums2)

            def find_intersection(arr1, arr2):
                intersection = []

                for i in arr1:
                    if i in arr2 and i not in intersection:
                        intersection.append(i)

                return intersection

            if n1 < n2:
                return find_intersection(nums1, nums2)
            else:
                return find_intersection(nums2, nums1)

The way I approached this problem was to use the smaller array of the two as the array to loop through, as I would have less items to loop through, and check to see if that value is in the second array. If it is and that number doesn't already exists in the returning array I append it to the returning array. The time complexity of this algorithm is *O(n)*. 

You can find the whole problem [here](https://leetcode.com/problems/intersection-of-two-arrays/).