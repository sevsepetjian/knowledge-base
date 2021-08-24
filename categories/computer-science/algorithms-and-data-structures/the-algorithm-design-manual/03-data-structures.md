# Data Structures
---
Changing a data structure can boost performance tremendously. So it is very critical to design your programs around a good/correct data structure initially, and not wait later to to make a change (if it can be helped).

There are 3 fundamnetal absract data types:

- Containers
- Dictionaries
- Priority Queues

Data structures can be classified as either contiguous or linked, depending upon whether they are based on arrays or pointers.

**Contiguously-Allocated Structures** - are composed of single slabs of memory, and include arrays, matrices, heaps, and hash tables.

**Linked Structures** - are composed of distinct chunks of memory bound together by pointers, and includes lists, trees, and graph adjacency lists. 

The array is the fundamental contiguously-allocated data structure.

Advantages of contiguously allocated arrays:

- **Constant-time access given the index** - because the index of each element maps directly to a particular memory address, we can access arbitrary data items instantly provided the index.
- **Space effeciency** - arrays consist of purely data, so no space is wasted with links or other formatting information. 
- **Memory locality** - arrays are great for iterating through elements becuase they exhibit excellent memory locality. Exploited even further by modern computer architecture such as "cache memory". 

We can dynamically add space to arrays by doubling its size everytime it runs out of room.

**Pointers** - are connections that hold the pieces of linked strucutres together. Pointers represent the address of a location in memory. Example, a cellphone number is the "address" of your phone. 

All linked data strucutres share certain properties:

- Each node in our data structure contains one or more data fields that retain the data that we need to store. 
- Each node contains a pointer field to at least one other node. This means that much of the space used in linked date structures has to be devoted to pointers, not data. 
- Finally, we need a pointer to the head of the strucutre, to know where to access it.

3 basic operations supported by lists are searching, insertion, and deletion.

In doubly-linked lists, each node points both to its predecessor and its successor element. This simplifies certain operations at a cost of an extra pointer field per node. 

Relative advantages of linked lists:

- Overflow on linked strucutres can never occur unless the memory itself is actually full.
- Insertions and deletions are simpler than contiguous (array) lists.  
- With large records, moving pointers is easier and faster than moving the items themselves. 

Relative advantages of arrays:

- Linked structures require extra space for storing pointer fields.
- Linked list do not allow effecient random access to items.
- Arrays allow better memory locality and cache performance than random pointer jumping.

Dynamic memory allocation provides us with flexiblity on how and where we use our limited storage resources.

Both arrays and lists are recursive objects. Chopping the first element of a linked list leaves a smaller linked list. Splitting the first *k* elements off of an *n* element array gives two smaller arrays.

**Container** - denotes a data structure that permits storage and retrieval of data items independent of content. 

The 2 most important type of containers are:

- **Stacks** - supports retrieval by last in-first out (LIFO). This is the right container to use when retrieval order doesn't matter, like when processing batch jobs. LIFO order arises in real world contexts like subways, putting items away in fridge, and in recursive algorithms. 
- **Queues** - supports retrieval by first in-first out (FIFO). Fairest way to conrol waiting time services. You want the container holding jobs to be containerized in FIFO order to minimize the maximum time spent waiting. 

Both stacks and queues can be implemented by arrays or linked lists. The key issue is if the upperbound on the container is known in advance. 

**Dictionary** - permits access to data items by content. Primary operations include:

- *Search(D, k)* - given a search key *k*, return a pointer to the element in dictionary *D* whose key value is *k*, if one exists.
- *Deletion(D, x)* - given a pointer to a given data item *x* in the dictionary *D*, remove it from *D*.
- *Insertion(D, x)* - given a data item *x*, add it to the set in the dictionary *D*.
- *Max(D)* or *Min(D)* - retrieve the item with the largest (or smallest) key from *D*. This enables the dictionary to serve as a priority queue. 
- *Predecessor(D, k)* or *Successor(D, k)* - Retrieve the item from *D* whose key is immediately before (or after) *k* in sorted order. These enable us to iterate through the elements of the data strucutre.

Data structure design must balance all the different operations it supports. The fastest data structure to support both operations *A* and *B* may not be the fastest strucutre to support either operation *A* or *B*. 

**Dictionary Operation Runtimes**

![Dictionary runtime](/static/assets/algo-03-dic-runtimes.png)

**Binary Search** - requires that we have fast access to two elements, specifically the median elements above and below the given node. To combine these ideas we need a linked list with 2 pointer nodes.

**Rooted binary tree** - is recursively defined as being empty or consisting of a node called root, together with 2 rooted binary trees called the left and right subtrees. The left subtree values will always be less than the right subtree values. 

![Binary tree](/static/assets/algo-03-binary-tree.png)

Binary search trees take *O(h)* time, where *h* is the height of the tree.

**Balanced search trees** - adjust tree after each insertion/deletion operation. Balanced trees have been developed to always return *O(logn)*. 

Picking a wrong data structure for the job can be disastrous in terms of performance. Finding the best data structure is not reallly critical becuase there can be more than one choice that performs similarly. 

**Priority Queues** - provides more flexibility than simple sorting, because they allow new elements to enter a system at arbitrary intervals. It is much more cost-effective to insert a new job into a priority queue than to re-sorteverything on each such arrival.

The basic priority queue supports three primary operations:

- *Insert(Q, x)* - Given an item *x* with key *k*, insert it into the priority queue *Q*. 
- *Find-Minimum(Q) or Find-Maximum(Q)* - Return a pointer to the item whose key value is smaller (larger) than any other key in the priority queue *Q*. 
- *Delete-Minimum(Q) or Delete-Maximum(Q)* - Remove the item from the priority queue *Q* whose key is minimum (maximum). 

Building algorithms around data structures such as dictionaries and priority queues leads to both clean structure and good performance.

**Priority Queue Operation Runtimes**

![Priority Queues Operation Runtimes](/static/assets/algo-03-pqueue-op-runtimes.png)

**Hash Tables** - are a very practical way to maintain a dictionary. They exploit the fact that looking an item up in an array takes constant time once you know its index.

A good hash function is:

- Cheap to evaluate.
- Tends to use all positions *0* to *M* with uniform frequency.

An example of this can be using ASCII to map characters to integers, creating a unique hash in the process. The exact same words will share the same code, while any variations of those words (think anagrams) will produce a different code and be a entirely different hash. 

Pragmatically, a hash table is often the best data structure to maintain a dictionary. However, the worst-case time is unpredictable.

The best worse-case bounds come from balanced binary trees.

Google uses hash algorithms for its search engine. Try to think of how you'd implement a hash table to uniquely identify all the documents on the web.

For example, a system that detects plagiarized submissions (essays, documents, etc) can break down the entire length of the document to a single hash value. But, a change in a single character would break that system because the hash will now be different. A method to extend this idea is to create overlapping windows of characters that you hash and measure against the other document. For example you hash the first [1 - 100] characters, then [2-200] characters, and so on. This will allow you to check the substrings and find matches with the other documents substrings, allowing you to gauge if the documents are identical enough to warrant a review.  

Hash table collisions occur when two distinct keys occasionaly hash to the same value. Two ways of dealing with collisions are:

- **Chaining** - represent the hash table as an array of *m* linked lists. However, this approach devotes a considerable amount of memory to pointers.
- **Open Addressing** - the hash table is maintained as an array of elements (not buckets), each initialized to *null*. 
    - Insertion - check to see if the desired position is empty, if so insert. If not, find some other place to insert (sequential probing). 
    - Search - go to appropriate hash value and check to see if the item there is the one we want. If so return, otherwise keep checking through the length of the run.
    - Deletion - can get ugly since removing one element might break a chain of insertions, making some elements inaccessible. We have no alternative but to reinsert all the items in the run following the new hole.

**Doubly-Linked List Hash Table With Chaining Runtimes**

![Chaining Hash Table Runtimes](/static/assets/chaining-hash-table-runtimes.png)

**Strings** - are sequences of characters where the order of the characters matter. 

The primary data structure for representing strings is an array of characters, and the most fundamental operation on text strings is substring search. 

They key idea of hashing is to represent a large object (be it a key, a string, or a substring) using a single number. The goal is a representation of a large object by an entity that can be manipulated in constant time, such that it is relatively unlikely that two different large objects map to the same value. 

The design principle of these data structures are the same for basic objects. There exists a set of basic operations repeatedly used, and as such we always look for the data structures that utilize these operations effeciently.

