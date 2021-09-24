# Graph Traversal
---

Graphs are one of the unifying themes of computer science - an abstract representation that describes the organization of transportation systems, human interactions, and telecommunication networks. 

More precisely, a graph *G = (V, E)* consists of a set of vertices *V* together with a set *E* of vertex pairs or edges. Graphs are very important because they can be used to represent any relationship.

Graphs can model a network of roads, with cities as vertices and roads between cities as edges.

![Graph Road model](/static/assets/algo-05-graph-city-example.png)

**The key** to using graph algorithms effectively in applications lies in correctly modeling your problem so you can take advantage of existing algorithms. 

#### Graph Flavors

- **Undirected vs Directed** - A graph *G = (V, E)* is undirected if edge *(x, y) &isin; E* implies that *(y, x)* is also in *E*. If not, we say that the graph is directed. Road networks between cities are typically undirected, since any large road has lanes going in both directions. Street networks within cities are almost always directed, because there are at least a few one-way streets lurking somewhere. Program-flow graphs are typically directed, because the execution flows from one line into the next and changes direction only at branches. Most graphs of graph-theoretic interest are undirected.
- **Weighted vs Unweighted** - Each edge (or vertex) in a weighted graph *G* is assigned a numerical value, or weight. The edges of a road network graph might be weighted with their lenght, drive-time, or speed limit, depending upon the application. In unweighted graphs, there is no cost distinction between various edges and vertices. The difference between weighted and unweighted graphs becomes particularly apparent in finding the shortest path between two vertices. For unweighted graphs , the shortest path must have the fewest number of edges, and can be found using a breadth-first search. 
- **Sparse vs Dense** - Graphs are sparse when only a small fraction of the possible vertex pairs (*(n / 2)* for simple, undirected graph on *n* vertices) actually have edges defined between them. Graphs where a large fraction of the vertex pairs define edges are called dense. There is no official boundary between what is called sparse and what is called dense, but typically dense graphs have a quadratic number of edges, while sparse graphs are linear in size.Sparse graphs are usually sparse for application-specific reasons. Road networks must be sparse graphs because of road junctions. 
- **Cyclic vs Acyclic** - An acyclic graph does not contain any cycles. Trees are connected, acyclic undirected graphs. Trees are the simplest interesting graphs, and are inherently recursive structures because cutting any edge leaves two smaller trees. Directed acyclic graphs are called *DAG*s. They arise naturally in scheduling problems, where a directed edge *(x,y)* indicates that activity *x* must occur before *y*. An operation called topological sorting orders the vertices of a *DAG* to respect these precedence constraints. Topological sorting is typically the first step of any algorithm on a *DAG*. 
- **Embedded vs Topological** - A graph is embedded if the vertices and edges are assigned geometric positions. Thus, any drawing of a graph is an embedding, which may or may not have algorithmic significance. Occasionally, the structure of a graph is completely defined by the geometry of its embedding. For example, if we are given a collection of points in the plane, and seek the minimum cost tour visiting all of them (i.e., the traveling salesman problem), the underlying topology is the complete graph connecting each pair of vertices. The weights are typically defined by the Euclidean distance between each pair of points. Grids of points are another example of topology from geometry. Many problems on an *n × m* grid involve walking between neighboring points, so the edges are implicitly defined from the geometry. 
- **Implicit vs Explicit** - Certain graphs are not explicitly constructed and then traversed, but built as we use them. A good example is in backtrack search. The vertices of this implicit search graph are the states of the search vector, while edges link pairs of states that can be directly generated from each other. Because you do not have to store the entire graph, it is often easier to work with an implicit graph than explicitly construct it prior to analysis. 
- **Labeled vs Unlabeled** - Each vertex is assigned a unique name or identifier in a labeled graph to distinguish it from all other vertices. In unlabeled graphs, no such distinctions have been made. Graphs arising in applications are often naturally and meaningfully labeled, such as city names in a transportation network. A common problem is that of isomorphism testing—determining whether the topological structure of two graphs are identical if we ignore any labels. Such problems are typically solved using backtracking, by trying to assign each vertex in each graph a label such that the structures are identical. 

![Graph Flavors](/static/assets/algo-05-graph-flavors.png)

#### Friendship Graph Example

- If I am your friend, does that mean you are my friend? - This question really asks whether the graph is directed. A graph is undirected if edge *(x,y)* always implies *(y,x)*. Otherwise, the graph is said to be directed. The heardof graph is directed, since I have heard of many famous people who have never heard of me! The had-sex-with graph is presumably undirected, since the critical operation always requires a partner. I’d like to think that the friendship graph is also an undirected graph. 
-How close a friend are you? - In weighted graphs, each edge has an associated numerical attribute. We could model the strength of a friendship by associating each edge with an appropriate value, perhaps from -10 (enemies) to 10 (blood brothers). The edges of a road network graph might be weighted with their length, drive-time, or speed limit, depending upon the application. A graph is said to be unweighted if all edges are assumed to be of equal weight. 
- Am I my own friend? - This question addresses whether the graph is simple, meaning it contains no loops and no multiple edges. An edge of the form *(x,x)* is said to be a loop. Sometimes people are friends in several different ways. Perhaps *x* and *y* were college classmates and now work together at the same company. We can model such relationships using multiedges—multiple edges *(x,y)* perhaps distinguished by different labels. Simple graphs really are often simpler to work with in practice. Therefore, we might be better off declaring that no one is their own friend.
- Who has the most friends? – The degree of a vertex is the number of edges adjacent to it. The most popular person defines the vertex of highest degree in the friendship graph. Remote hermits are associated with degree-zero vertices. In dense graphs, most vertices have high degrees, as opposed to sparse graphs with relatively few edges. In a regular graph, each vertex has exactly the same degree. A regular friendship graph is truly the ultimate in social-ism.
- Do my friends live near me? - Social networks are not divorced from geography. Many of your friends are your friends only because they happen to live near you (e.g., neighbors) or used to live near you (e.g., college roommates). Thus, a full understanding of social networks requires an embedded graph, where each vertex is associated with the point on this world where they live. This geographic information may not be explicitly encoded, but the fact that the graph is inherently embedded in the plane shapes our interpretation of any analysis.
- Oh, you also know her? - Social networking services such as Myspace and LinkedIn are built on the premise of explicitly defining the links between members and their member-friends. Such graphs consist of directed edges from person/vertex *x* professing his friendship to person/vertex *y*. That said, the complete friendship graph of the world is represented implicitly. Each person knows who their friends are, but cannot find out about other people’s friendships except by asking them. The six degrees of separation theory argues that there is a short path linking every two people in the world (e.g., Skiena and the President) but offers us no help in actually finding this path. The shortest such path I know of contains three hops (Steven Skiena → Bob McGrath → John Marberger → George W. Bush).
- Are you truly an individual, or just one of the faceless crowd? - This question boils down to whether the friendship graph is labeled or unlabeled. Does each vertex have a name/label which reflects its identify, and is this label important for our analysis? Much of the study of social networks is unconcerned with labels on graphs. Often the index number given a vertex in the graph data structure serves as its label, perhaps for convenience or the need for anonymity. You may assert that you are a name, not a number—but try protesting to the guy who implements the algorithm. Someone studying how an infectious disease spreads through a graph may label each vertex with whether the person is healthy or sick, it being irrelevant what their name is. 

Graphs can be used to model a wide variety of structures and relationships. Graph-theoretic terminology gives us a language to talk about them.

#### Data Structures for Graphs

Selecting the right data structure for graphs can once again have huge impact on performance. 

Two basic choices:

- **Adjacency Matrix** - We can represent *G* using an *n × n* matrix *M*, where element *M[i,j] = 1* if *(i,j)* is an edge of *G*, and *0* if it isn’t. This allows fast answers to the question is *(i,j)* in *G*?, and rapid updates for edge insertion and deletion. It may use excessive space for graphs with many vertices and relatively few edges, however.
- **Adjacency Lists** - We can more efficiently represent sparse graphs by using linked lists to store the neighbors adjacent to each vertex. Adjacency lists require pointers but are not frightening once you have experience with linked structures. Adjacency lists make it harder to verify whether a given edge (i,j) is in G, since we must search through the appropriate list to find the edge. However, it is surprisingly easy to design graph algorithms that avoid any need for such queries. Typically, we sweep through all the edges of the graph in one pass via a breadth-first or depth-first traversal, and update the implications of the current edge as we visit it 

![Graph Matrix and List Comparison](/static/assets/algo-05-graph-matrix-list-comparison.png)

Adjacency lists are the right data structure for most applications of graphs.


#### Traversing a Graph

Perhaps the most fundamental graph problem is visit every edge and vertex in a graph in a systematic way.

**The key idea** behind graph traversal is to mark each vertex when we first visit it and keep track of what we have not yet completley explored by using Boolean flags or enumerated types.

Each vertex exists in one of three states:

- **undiscovered** - the vertex is in its initial, virgin state.
- **discovered** - the vertex has been found, but we have not yet checked out all its incident edges. 
- **processed** - the vertex after we have visited all its incident edges. 

The state of each vertex goes from undiscovered -> discovered -> processed.

We must also maintain a structure containing the vertices that we have discovererd but not yet completely processed.To completely explore a vertex *v*, we must evaluate each edge leaving *v*. If an edge goes to an undiscovered vertex *x*, we mark *x* discovered and add it to the list of work to do. We ignore an edge that goes to a processed vertex, because further contemplation will tell us nothing new about the graph. We can also ignore any edge going to a discovered but not processed vertex, because the destination already resides on the list of vertices to process. 

#### Breadth-First Search

At some point during the course of a traversal, every node in the graph changes state from undiscovered to discovered. In a breadth-first searech of an undirected graph, we assign a direction to each edge, from the discoverer *u* to the discovered *v*. We thus denote *u* to be the parent of *v*. Since each node has exactly one parent, except for the root, this defines a tree on the vertices of the graph. This tree, illustrated in Figure 5.9, defines a shortest path from the root to every other node in the tree. This property makes breadth-first search very useful in shortest path problems. 

![Breadth-First Search](/static/assets/algo-05-bfs-example.png)

Most elementary graph algorithms make one or two traversals of the graph while we update our knowledge of the graph. Properly implemented using adjacency lists, any such algorithm is destined to be linear, since BFS runs in *O(n + m)* time on both directed and undirected graphs. This is optimal, since it is as fast as one can hope to read any *n-vertex*, *m-edge* graph. The trick is seeing when traversal approaches are destined to work. 

Breadth-first and depth-first searches provide mechanisms to visit each edge and vertex of the graph. They prove the basis of most simple, efficient graph algorithms. 


#### Depth-First Search

The difference between BFS and DFS results is in the order in which they explore vertices. This order depends completely upon the container data structure used to store the discovered but not processed vertices.

- **Queue** - By storing the vertices in a first-in, first-out (FIFO) queue, we explore the oldest unexplored vertices first. Thus our explorations radiate out slowly from the starting vertex, defining a breadth-first search.
- **Stack** - By storing the vertices in a last-in, first-out (LIFO) stack, we explore the vertices by lurching along a path, visiting a new neighbor if one is available, and backing up only when we are surrounded by previously discovered vertices. Thus, our explorations quickly wander away from our starting point, defining a depth-first search.

![Depth-First Search](/static/assets/algo-05-dfs-example.png)

Depth-first search use essentially the same idea as backtracking. Both involve exhaustively searching all possibilities by advancing if it is possible, and backing up as soon as there is no unexplored possibility for further advancement. Both are most easily understood as recursive algorithms.

DFS organizes vertices by entry/exit times, and edges into tree and back edges. This organization is what gives DFS its real power.