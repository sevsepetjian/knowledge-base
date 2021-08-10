# Algorithm Analysis
---

One important idea is that you can study algorithms in a machine independent way. 2 important tools to do so:

- RAM model of computation.
- The asymptotic analysis of worst-case complexity. 

The "RAM" in RAM model stands for random access machine. And the properties of this model are as follows:

- Each simple operation (+, -, *, =, if, call) takes exactly one step.
- Loops and subroutines (methods for example), are **not** considered simple operations. They are the composition of many single step operations, and loops specifically depend on how many iterations that loop goes through. 
- Each memory access takes one step at a time, and it doesn't care if the item is in cache or in memory.

Under RAM we measure runtime by the amount of steps taken on a given instance. This is a good model when we apply to algorithm design, but can be infactual given a different settings. For example memory access takes on step under RAM, but fetching something from cache is much quicker than going to memory. 

To understand the time complexity under RAM, we use all instances of *n* to figure that out. The more steps it takes the worse the algorithm is, formally defined as:

- **worst-case complexity** - is the function defined by the maximum number of steps take in any instance of size *n*. Represented by the curve passing through the highest point in each column.
- **best-case complexity** - is the function defined by minimum number of steps taken in any instnace of size *n*. Represented by the curve passing through the lowest point in each column.
- **average-case complexity** - is the function defined by the average number of steps of all instnaces of size *n*. 

Worst-case complexity is the most useful of these measures because it is the most clear and concrete piece of information you have about the algorithm. The other two have many variables that can be subjective or ust completely impractical to consider.

The Big Oh simplifies our analysis by ignoring levels of details that don't impact our comparison of algorithms. Formal definitions of Big Oh:

- **f(n) = O(g(n))** - (a) means that a constant *c* * g(n) is an upper bound on f(n). Thus there exists some constnat *c* such that f(n) is always <= *c* * g(n).
- **f(n) = &#937;(g(n))** - (b) means that *c* * g(n) is a lower bound on f(n). Thus ther exists some constant *c* such that f(n) is always >= *c* * g(n). 
- **f(n) = &#952;(g(n))** - (c) means that *c*<sub>1</sub> * g(n) is an upper bound of f(n) and *c*<sub>2</sub> * g(n) is a lower bound of f(n), for all n >= n<sub>0</sub>. So there exists constants *c*<sub>1</sub> and *c*<sub>2</sub> such that f(n) <= *c*<sub>1</sub> * g(n) and f(n) >= *c*<sub>2</sub> * g(n). This means that g(n) provides a nice tight bound on f(n).

![Upper bound case](/static/assets/algo-02-upperbound.png) ![Lower bound case](/static/assets/algo-02-lowerbound.png) ![Average case](/static/assets/algo-02-averagecase.png)

Some facts about the common runtime classes.

- All those algorithms take roughly the same time for *n = 10*. 
- Any algorithm with n<sup>!</sup> running time becomes useless for *n >= 20*.
- Algorithms whose running time is 2<sup>n</sup> have a greater operating range, but become impractical for *n > 40*.
- Quadratic time algorithms whose running time is n<sup>2</sup> remain usable up to n = 10,000 but quickly deteriorate with larger inputs. They are likely to be hopeless for *n > 1,000,000*. 
- Linear time and nlgn algorithms remain practical on inputs of one billion items.
- An O(*lgn*) algorithms hardly breaks a sweat for any imaginable value of *n*.

The fastest grwoing function dominates a slower growing one. Example, *g* dominates *f* when *f(n) = O(g(n))* written as *g>>f*. Constants don't change a functions dominance class. This however, is not true when you multiply functions. For example, *O(f(n)) * O(g(n)) <= c<sub>1</sub> * c<sub>2</sub> n<sup>3</sup>, if g(n) = n<sup>2</sup>*. This is the reason why two nested loops are *n<sup>2</sup>*. 

Function runtime classes:

- **Constant functions** - *f(n) = 1*. Such functions might measure the cost of adding two numbers.
- **Logarithmic functions** - *f(n) = lgn*. Shows up in algorithms like binary search. Grows slowly as *n* gets big, but faster than constant. 
- **Linear functions** - *f(n) = n*. Measures cost of looking at each item once (or twice, or ten times) in a *n*-element array. 
- **Super linear functions** - *f(n) = nlgn*. Algorithms such as quicksort and mergesort. Grows only a little faster than linear.
- **Quadratic functions** - *f(n) = n<sup>2</sup>*. Measures cost of looking up at most or all pairs of items in a *n*-element universe. Algorithms like insertion and slection sort. 
- **Cubic functions** - *f(n) = n<sup>3</sup>*. Enumerate through all triples of items in a *n*-element universe. Exmples would be dynamic programming algorithms.
- **Exponential functions** - *f(n) = c<sup>n</sup>*. For a given constant *c > 2<sup>n</sup>*. Enumerates through all subsets of *n* items.
- **Factorial functions** - *f(n) = n<sup>!</sup>*. An example would be generating all permuations or orderings of *n* items.

The dominance relationshp of the above: *n!>>2<sup>n</sup>>>n<sup>3</sup>>>n<sup>2</sup>>>nlogn>>n>>logn>1*

The formula for expressing these dominance relationships is: *n<sup>a</sup>* dominates *n<sup>b</sup>* if *a > b*, since *lim<sub>n -> &#8734;</sub> n<sup>b</sup>/n<sup>a</sup> = n<sup> b - a</sup> -> 0* (approaches '0'). For example, *n<sup>1.999</sup>/n<sup>2</sup> -> 0*. Meaning if you keep dividing this you will reach 0 which proves the dominance relationship.


**Logarithm** (anagram of algorithm) is simply an inverse exponetial function. Saying *b<sup>x</sup> = y* is equivalent to saying that *x = log<sub>b</sub>y*. Logarithms arise whenever things are repeatedly halved.

**Binary search** is one of the most powerful ideas in algorithm design. An example of which can be the manhattan phone book problem, where you when looking for a name  you start at the middle of the phone book and choose the side that the name is part of. You discard the other half and you repeat this halving process.

There are 3 bases of logs that are important to note:

- Base *b = 2* - The binary log is a base 2 logarithm. Appears in repeated halving (binary search) or doubling (nodes in tree). Most algorithm applications in logs imply binary logs.
- Base *b = e* - The natural log is a base *e = 2.71825* log. The inverse is the exponential function *exp(x) = e<sup>x</sup>*.
- Base *b = 10* - Less common today is the base 10 log or common log. 

An important log property note is: *log<sub>a</sub>(xy) = log<sub>a</sub>(x) + log<sub>a</sub>(y)*. 

From an algorithm perspective, the base of logs has no real impact on growth, and logs cut any function down to size.