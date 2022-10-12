const fetch = require('node-fetch');
// const axios = require('axios');

function dacheQL({ redis } = {}, capacity = 50, endpoint = '', TTL) {
  //if the user is using redis
  if (redis) {
    return async function redisCache(req, res, next) {
      try {
        if (req.method === 'POST') {
          //check to see if the query is already in redis
          const query = await redis.get(req.body.query);

          //if the query is not in redis, follow this control flow
          if (!query) {
            //fetch the graphql response to the user's specified endpoint
            const fetchedData = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                query: req.body.query,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                return JSON.stringify(data);
              })
              .catch((err) => console.log('err in fetch server'));

            //set the key as the query in Redis with the value as the GraphQL response
            const obj = await redis.SETEX(req.body.query, TTL, fetchedData);
          }
        }
        return next();
      } catch (err) {
        return next({
          message: ('err occurred', err),
          log: `err occurred in redis controller ${err}`,
          status: 400,
        });
      }
    };
  } else {
    capacity = Math.floor(capacity);
    //if they are missing the url
    if (!endpoint) {
      throw new Error({ log: 'Url Argument is missing or invalid' });
    } else {
      //new instance of our cache that we are making for the user
      const cache = new LRUCache(capacity, endpoint);
      //this returned function has access to request bodies etc which we can then pass down into our LRUCache class
      return async function cacheHandler(req, res, next) {
        const { query } = req.body;
        console.log('REQ BODY: ', req.body);
        console.log('METHOD: ', query);
        //cachechecker is the evaluated result of trying to get the query from the hashmap
        const cacheChecker = cache.get(query);
        console.log('cache Checker before delete ', cacheChecker);
        // console.log('cache Checker', cacheChecker);
        if (query === 'CLEAR') {
          console.log('cache Checker before delete ', cacheChecker);
          cache.delete(query);
          console.log('cache Checker after delete ', cacheChecker);
          delete cache;
        }
        //req.body we just want the query they are asking for
        //if it is inside the cache then it just spits out query result tied to that query key and moves it to the first position of the LL
        //if its not we are gonna make a req to the db and alter our LL and Hashmap as well.
        //this will only be done once for as long as that item is in our cache saving the client substantial time
        if (!cacheChecker) {
          //in the event that the query does not exist in our cache after invoking our get on it we make a query to the database
          // axios
          //   .post(endpoint, {
          //     query: query,
          //   })
          fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: query,
            }),
          })
            // .then((res) => res.json())
            .then((data) => {
              console.log('data in redis controller, ', data);
              const result = JSON.stringify(data.data);
              if (capacity > 1) {
                //here essentially removes the edge case for a invalid capacity under zero to proceed
                //reassigning our query result to the returned value of adding a new node (LL) and key value pair (HashMap) so we can send it as a response
                const queryResult = cache.put(query, result);
                res.locals.queryResult = queryResult;
                // console.log('OUR LINKED LIST CONTENTS AFTER AXIOS FETCH: ', cache.list);
                return next();
              }
              // if capicity <= 0, query to graphQL directly only edge case we just directly query for them when they dont make a cache size above 0
              else res.locals.queryResult = result;
              return next();
            })
            .catch((err) => {
              return next({
                message: ('err occurred', err),
                log: `err occurred in GraphQL query: ${err}`,
              });
            });
        } else {
          //if the query is actually in our cache so the other control flow statement we can simply employ our get method from our LRUCache class
          res.locals.queryResult = cacheChecker;
          // console.log('OUR LINKED LIST CONTENTS IN THE ELSE STATEMENT: ', cache.list);
          return next();
        }
      };
    }
  }
}

//if we want our methods to run in constant time O(1) we can take a
//look at which data structures we want to utilize
//the only data structrue that allows us to retrieve a value of a given key in constant time
//is the hash table. Hashtables will let us have constant time when searching up items, but
//we wont be able to keep track of what is the least recently used item. Therefore we need to
//use a second datastructure. In order to evict items we will need to use deletion therefore we
//should look at datastructures that can delete in constant time leaving us with only
//stacks/queues/linkedlists as our options. We chose linkedlists bc stacks and queues will only let us
//access items in the beginning or end. SO WE WILL COMBINE HASHTABLE WITH LINKEDLIST

//hashmap keys will correspond to nodes in the linked list. Any time we create a new item(aka query)
//we will insert it at the front of the LL. When we want to access that particular node we will
//delete it and insert it at the front again(this way the most recently used item will always
//be at the front and the least recently used one will be at the end)

//using class syntax

class LRUCache {
  constructor(capacity, url) {
    //initialize hashmap and linked list, needs to save the capacity, and keep track of size
    //we also keep track of the url and capacity through this
    // this.map = {};
    //this.map is a new instance of a map
    this.map = new Map();
    this.list = new DoublyLinkedList();
    this.capacity = capacity;
    this.url = url;
    //console.log('constructing cache');
  }
  //get method should grab value of the key from the hashmap and move it to the front of the linkedlist
  get(key) {
    if (key) {
      const keyChecker = key.trim();
    }
    //trims the key that gets passed in to the get to get rid of the unneccessary spaces
    //native method get and has
    if (this.map.has(keyChecker)) {
      //the key is in the hashmap
      console.log('using cache GET');
      //using get native not ours
      const valueInCache = this.map.get(keyChecker);
      //assign value in cache to the value of the map at that key instance
      //make new instnace of a node with the valueInCache
      const node = new ListNode(valueInCache, keyChecker);

      if (this.list.size !== 1) {
        this.list.moveToFront(node);
        //edge case for when the capacity is 1 we just send back the value
      }
      return node.value;
    } else {
      return false;
    }
  }
  put(key, value) {
    //key already exists in our hashmap so in this case if put is being called we are updating
    if (key) {
      const keyChecker = key.trim();
    }
    //reassigning the key to the value of the key trimmed to avoid the spaces
    if (this.list.size >= this.capacity) {
      //EVICTING
      //if the key doesn't exist in our cache (there are two scenarios we are below capacity or we are at capacity)
      //if at capacity evict the least recently used item aka end of the LL
      //remove it from the LL and hashmap and decrement LL size by 1
      //delete the last item in the cache
      // console.log('KEY: ', key);
      //console.log('this.map: ', this.map);
      const lastNode = this.list.removeLast();
      //removeLast method will also return the last node so we can later delete it in our
      //hashmap as well
      //we are deleting from the hashmap via the new key property we added to each linked list node
      this.map.delete(lastNode.key);
      //stick in the new node at the front aka add method
      const newNode = new ListNode(value, key);
      this.list.add(newNode);
      this.map.set(key, value);
      //placing into the hashmap
    } else {
      //if not at capacity and it doesnt exist we save the data to our hashmap and our linkedlist
      //increment size too
      const newNode = new ListNode(value, key);
      this.list.add(newNode);
      this.map.set(key, value);
    }
    // }
    // console.log('CONTENT IN this.map: ', this.map);
    return this.map.get(key);
  }
  delete(key) {
    if (key) {
      const keyChecker = key.trim();
    }
    console.log('cleaning cache', this.map.has(keyChecker));
    this.map.clear();
    if (this.map.has(keyChecker)) {
      //the key is in the hashmap
      // console.log('using GET');
      //using get native not ours
      // const value = this.map.get(keyChecker);
      // console.log(value);
      // const deleteNode = new ListNode(keyChecker, value);
      // this.list.delete(deleteNode);
      // return 'cache cleared';
    } else {
      console.log('DNE in cache');
      // return "Doesn't exist in cache";
    }
    console.log('cache cleared', this.map.has(keyChecker));
    console.log('CONTENT OF CACHE AFTER CLEAR: ', this.map);
  }
}

class DoublyLinkedList {
  constructor() {
    // to avoid edge cases will initialize the head and tail to dummy list node
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  add(newNode) {
    //new instance of node
    if (!this.head && !this.tail) {
      //console.log('head doesn\'t exist');
      this.head = this.tail = newNode;
      //if linkedlist is empty
    } else {
      newNode.next = this.head;
      //this is making the new node point to the head
      this.head.prev = newNode;
      //makes the old head point to the new node as its previous value
      this.head = newNode;
      //this is seting the new head to the new node
    }
    this.size++;
  }
  //should also return the node it deletes
  removeLast() {
    // deleting a tail and returning it
    const lastNode = this.tail;
    //saving this node so we can use delete on it
    this.tail.prev.next = null;
    //since the one before it is now the new tail it points to null
    this.tail = this.tail.prev;
    //the new tail is now the one before it
    this.delete(lastNode);
    //delete the tail that was assigned to this variable before the rest of this
    return lastNode;
  }
  moveToFront(node) {
    //deletes node and then adds to front aka for updating
    this.delete(node);
    this.add(node);
    return node;
  }
  delete(node) {
    //traverse till we hit the node we want then invoke the functionality of conjoining whats in front and back of it
    //connects previous node to next one aka removing current one from LL
    // console.log('attempt to delete node', node);
    if (!this.head && !this.tail) {
      return;
    }
    // checking value of head
    if (this.head.value === node.value) {
      this.head = this.head.next;
      //deletion when equal to the head
      // checking value of tail
    } else if (this.tail.value === node.value) {
      //if the tail is what we are trying to delete
      //i think we having a issue here
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let current = this.head;
      //traversal
      while (current && current.next) {
        //checking by location that the nodes are the same
        //if the node is tail and has same value as the argument node
        //if only one node in LL;
        if (current.next.value === node.value) {
          // console.log('DELETE TARGET IS FOUND NOT IN HEAD OR TAIL', current.next.value);
          //once found the target node
          current.next = current.next.next;
          current.next.prev = current;
          // return;
        } else {
          current = current.next;
          //traversing
        }
      }
    }
    this.size--;
    return node;
  }
}

//added a key property to our listNode so that when we send it back and try to delete it from the hashmap we can delete by
//key and not by value
class ListNode {
  constructor(value, key) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = 0;
  }
}

module.exports = dacheQL;
