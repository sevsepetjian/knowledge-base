# Introduction to Algorithm Design
---

An algorithm is a procedure to accomplish a specific task.

A crucial part of understanding algorithims is differentiating the general problem from the instance of that problem. For example, a general problem can be sorting while an instance of a that problem can sorting names, numbers, etc. The sorting algorithim will successfully do its job regardless of the specific instance of it.

There are many different methods to solve sorting, i.e. insertion sort, bubble sort, merge sort, etc.

There are 3 desirable properties of a good algorithim:

1. Correct (On any instance).
2. Effecient (Big 'O').
3. Easy to implement.

Algorithims are different than heuristics. Algorithims produce a correct result, assuming that it is a real algorithim and not a incorrect solution pretending to be one. On the other hand, a heurestic while may usually do a good job, doesn't guarantee that it always will. 

Seeking counter examples that break pretender algorithims is a important part of the process.

Mathematical proof:

- Clear precise statement of which you're trying to prove.
- Set of assumptions of things which are taken to be true and used as part of the proof.
- Chain of reasoning that takes you from assumptions to what you're trying to prove. 
- Little square or QED denoting your are finished. Represents "thus it is demonstrated".

Most common forms of algorithim notation:

- English
- Pseudocode
- Real programming language

Drawing may also be of use as a notation. It allows a visual representation of the process that may be more clear to express than simply words. 

Generally it is good to use English to epxress the idea generally, and only go down the abstraction chain as you need to become more precise with your solution.

The heart of any algorithim is an idea. If your idea is not clearly revealed when you express an algorithim, than you are using too low level of a notation. 

Ask the wrong problem, and you will get the wrong answer. Know what you're looking for, this can aslo apply to carefully modeling the problem.

Narrow the set of allowable instances until there is a correct and efficent algorithim. 

Traps of specifying output requirements:

- Asking ill-defined questions.
- Creating compound goals, pick only a single criteria. Ex. Shortest distance, not shortest distance plus x plus y etc.

Demonstrate algo incorrectness by actually showing it. Some helper techniques:

- Think small.
- Think exhuastively.
- Hunt for the weakness.
- Go for a tie - break greedy heuristic by setting everything to same value.
- Seek extremes.

Induction is a way to prove something for ALL n. Start by showing its obviously true by small n. Than assume its true for all n - 1. Then assume all n is true because n - 1 was true. 

Recursion is mathematical induction. You can use recursion to show induction in any given algorithm. Also summations are a good example of proving by induction. Both assume a base case, a general ability to create big things from smaller things. 

Modeling is the art of formulating your app in terms of precisely described, well understood problems. You can completely eliminate the need to implement an algorithim, if you properly model because you might find something that currently exists that you can use.

You must define the problem in terms of computing properties of common structures such as:

- **Permutations** - arrangements or orderings of items. Example, {1, 2, 3, 4} and {4, 3, 2, 1} are 2 different permuations of the same set of four integers. Keywords: "arrangement", "tour", "ordering", or "sequence". 
- **Subsets** - selections from a set of items. Example, {1, 3, 4} {2} are 2 distinct subsets of the first four integers. Order does not matter in subsets. Keywords: "cluster", "collection", "committee", "group", "packaging", or "selection". 
- **Trees** - hiearchical relationships. Keywords: "hiearchy", "dominance relationships", "ancestor/descendant relationship", or "taxonomy".
- **Graphs** - relationships between arbitrary pairs of objects, Keywords: "network", "circuit", "web", or "relationship". 
- **Points** - locations in some geometric space. Keywords: "site", "position", "data records", or "location".
- **Polygons** - regions in some geometric pace. Example, the borders of a country can be described by a polygon on a map/plane. Keywords: "shapes", "regions", "configurations", or "boundaries".
- **Strings** - sequences of characters or patterns. Example, name of students in a class. Keywords: "text", "character", "patterns", or "lables".

Single and most important step of finding a solution is to model your problem properly.

Learning to think recursively is learning to look for big things that are made of up smaller things of exactly the same type as the big thing.