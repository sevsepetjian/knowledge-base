# Sorting and Searching
---

Sorting is worth so much attention because:

- Sorting is the basic building block that many other algorthms are built. By understanding sorting we obtain an amazing amount of power to solve other problems.
- Most of the interesting ideas used in the design of algorithms appear in the context of sorting, such as divide and conquer, data structures, and randomized algorithms.
- Computers have spent more time sorting than anything else.
- Sorting is the most studied problem of computer science.

Sorting behave more like a data structure than a problem in its own right.

#### Applications of Sorting

There are clever sorting algorithms that run in *O(nlgn)* time.

An important algorithm design technique is to use sorting as a basic building block, because many other problems become easy once a set of items is sorted.

Sorting data is one of the first things any algorithm designer should try in the quest for efficiency.

Different types of applications:

- **Searching** - Binary search tests whether an item is in a dictionary in *O(log n)* time, provided the keys are all sorted. Search preprocessing is perhaps the single most important application of sorting.
- **Closest pair** - Given a set of n numbers, how do you find the pair of numbers that have the smallest difference between them? Once the numbers are sorted, the closest pair of numbers must lie next to each other somewhere in sorted order. Thus, a linear-time scan through them completes the job, for a total of *O(n log n)* time including the sorting. 
- **Element uniqueness** - Are there any duplicates in a given set of *n* items? This is a special case of the closest-pair problem above, where we ask if there is a pair separated by a gap of zero. The most efficient algorithm sorts the numbers and then does a linear scan though checking all adjacent pairs. 
- **Frequency distribution** - Given a set of *n* items, which element occurs the largest number of times in the set? If the items are sorted, we can sweep from left to right and count them, since all identical items will be lumped together during sorting. 
- **Selection** - What is the kth largest item in an array? If the keys are placed in sorted order, the *kth* largest can be found in constant time by simply looking at the *kth* position of the array. In particular, the median element appears in the *(n/2)nd* position in sorted order. 
- **Convex hulls** - What is the polygon of smallest area that contains a given set of n points in two dimensions? The convex hull is like a rubber band stretched over the points in the plane and then released. It compresses to just cover the points, as shown in Figure 4.1(l). The convex hull gives a nice representation of the shape of the points and is an important building block for more sophisticated geometric algorithms. But how can we use sorting to construct the convex hull? Once you have the points sorted by x-coordinate, the points can be inserted from left to right into the hull. Since the right-most point is always on the boundary, we know that it will appear in the hull. Adding this new right-most point may cause others to be deleted, but we can quickly identify these points because they lie inside the polygon formed by adding the new point. These points will be neighbors of the previous point we inserted, so they will be easy to find and delete. The total time is linear after the sorting has been done. 
![Convex Hulls Figure](/static/assets/algo-04-convex-hulls-figure.png)

Sorting lies at the heart of many algorithms. Sorting data is one of the first things any algorithm designer should try in the quest for efficiency.

#### Pragmatics of Sorting

One issue between different sorting applications is what order do we want the items sorted?

- Increasing/Decreasing order?
- Sorting just the keys or entire record?
- What should we do with equal keys?
- What about non-numerical data?

We can use comparison functions so that we can than use different types of sort independently from the application.

#### Heapsort: Fast Sorting via Data Structures

We study algorithms like selection sort because the design techniques are what is important to learn.

Data structures drastically improve sorting algorithms. Heapsort ends up being nothing more than a selection sort using the correct data structure (priority queue, balanced binary tree). 

Heaps are a simple and elegant data structure for efficiently supporting the priority queue operations *insert* and *extract min*. They work by maintaining a partial order on the set of elements which is weaker than sorted order, yet stronger than random order. A min heap is when the root is minimum, while a max heap is when the root is the maximum. 

![Heap Tree](/static/assets/algo-04-heap-tree.png)

Heap labeled tree is defined to be a binary tree such that the key labeling of each node dominates the key labeling of each of its children. 

Heap enables us to represent binary trees without using pointers. We still store data as an array of keys, and use the position of the keys to implictly satisfy the role of the pointers. Store root of tree in the first position and its left and right pointers in the second and third respectively. 

Construct heaps by ensure balance with *(n + 1)*st position insert, and dominance by performing swaps with the parent depending on the insertion. 

When you extract the min you must bubble down to restore the balance of the heap. You take the last left-most node and make that the root. You swap the new root with the samllest of its two children and continue that process until its the largest of its two children (also called heapify).

#### Mergesort: Sorting by Divide-and-Conquer

A recursive approach to sorting that involves partitioning the elementes into two groups, sorting each of the smaller problems recursively, and interleaving the two sorted lists to totally order the elements. *O(nlogn)*. 

![Mergesort Animation](/static/assets/algo-04-mergesort.png)

Great algorithm for sorting linked lists, because it does not rely on random access to elements as does heapsort or quicksort.

#### Quicksort: Sorting by Randomization

Supposed we select *p* from the *n* items we seek to sort. Quicksort seperates the *n - 1* other items into two piles. A low pile containing all the elements that appear before *p* in sorted order, and a high pile containing all the elements that appear after *p* in sorted order. Low and high denote the array positions we place the respective piles, leaving a single slot between them for *p*. *&#952;(n<sup>2</sup>)*. We can get better performance if the pivot position is the median of the array (getting lucky).

![Quicksort Animation](/static/assets/algo-04-quicksort.png)

However, half of the pivot is the median, so quicksort also runs in *O(nlogn)* time.

If we randomize the input array for a time of *O(n)* before running quicksort, we can ensure a *O(nlogn)* time because quicksort runs that fast on a randomized array.

Randomization is a powerful tool to improve algorithms with bad worst-case but average-case complexity. 

#### Distribution Sort: Sorting via Bucketing 

Sort by partitioning into seperate buckets. Think sorting telephone book by first letter of last name. You would create piles A-Z and than concatenate all of them at the end. You can partition even further with the second letter of the last name, and so on.

Bucketing is a great idea whenever we are confident that the distribution of data will be roughly uniform. It is the idea that underlies hash tables, kd-trees, and a variety of other practical data structures. 

Sorting can be used to illustrate most algorithm design paradigms. Data structure techniques, divide and conquer, randomization, and incremental construction all lead to effecient sorting algorithms. 

#### Binary Search and Related Algorithms

Binary search is a fast algorithm for searching in a sorted array of keys *S*. If *q* appear before *S[n|z]*, it must reside on the top half of *S*, if not it must reside in the bottom half of *S*. By repeating this process recursively on the correct half, we locate the key in a total *logn* time. 

Binary search and its variants are the quintessential divide-and-conquer algorithms.

#### Divide and Conquer

One of the most powerful techniques for solving problems is to break them down into smaller, more easily solved pieces. Smaller problems are less overwhelming, and they permit us to focus on details that are lost when we are studying the entire problem. A recursive algorithm starts to become apparent when we can break the problem into smaller instances of the same type of problem. Effective parallel processing requires decomposing jobs into at least as many tasks as processors, and is becoming more important with the advent of cluster computing and multicore processors.

Two important algorithm design paradigms are based on breaking problems down into smaller problems:

- **Dynamic programming** - remove element, solve smaller problem, and use solution to add back the elements.
- **Divide-and-conquer** - splits the problem in halves, solves each half, than stiches pieces back to original problem (like mergesort).

**Recurrence relation** - is an eqeuation that is defined in terms of itself (Fibonacci numbers). The self-reference property of recurrence relations is shared with recursive programs or algorithms providing a way to analyze them. 