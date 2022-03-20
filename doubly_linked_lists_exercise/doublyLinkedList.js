function Node(val){
    this.val = val;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList(array = []){
    this.head = null;
    this.tail = null;
    this.length = 0;

    if(Array.isArray(array)){
        array.forEach(el => {
            this.push(el);
        });
    }
}

DoublyLinkedList.prototype.push = function (val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  };
  
  DoublyLinkedList.prototype.unshift = function (val) {
    const newNode = new Node(val);
  
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  
    this.length++;
    return this;
  };
  
  DoublyLinkedList.prototype.insert = function (index, val) {
    const newNode = new Node(val);
    const prevNode = this.getNode(index - 1);
  
    newNode.next = prevNode.next;
    newNode.prev = prevNode;
    prevNode.next = newNode;
  
    return this.length++;
  };
  
  DoublyLinkedList.prototype.getNode = function (index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    let currentNode = this.head;
    let counter = 0;
  
    while (currentNode) {
      if (counter === index) {
        break;
      }
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  };
  
  DoublyLinkedList.prototype.get = function (index) {
    let node = this.getNode(index);
  
    return node ? node.val : null;
  };
  
  DoublyLinkedList.prototype.set = function (index, val) {
    let node = this.getNode(index);
  
    if (node) {
      node.val = val;
      return true;
    }
  
    return false;
  };
  
  DoublyLinkedList.prototype.pop = function () {
    if (!this.tail) {
      return undefined;
    } else {
      const nodeToPop = this.tail;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
        nodeToPop.prev = null;
      }
      this.length--;
      return nodeToPop.val;
    }
  };
  
  DoublyLinkedList.prototype.shift = function () {
    if (!this.head) {
      return undefined;
    }
    let nodeToPop = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = nodeToPop.next;
      nodeToPop.next = null;
      this.head.prev = null;
    }
  
    this.length--;
  
    return nodeToPop.val;
  };
  
  DoublyLinkedList.prototype.remove = function (index) {
    if (index === 0) {
      this.shift(index);
    } else if (index === this.length - 1) {
      this.pop(index);
    } else {
      if (index < 0 || index >= this.length) {
        return undefined;
      }
  
      const nodeToRemove = this.getNode(index);
  
      nodeToRemove.next.prev = nodeToRemove.prev;
      nodeToRemove.prev.next = nodeToRemove.next;
      nodeToRemove.prev = null;
      nodeToRemove.next = null;
  
      this.length--;
      return nodeToRemove.val;
    }
  };
  
  DoublyLinkedList.prototype.reverse = function () {
      let tempNode = this.head;
      this.head = this.tail;
      this.tail = tempNode;
      for (let i = 0; i< this.length; i++) {
          const prev = tempNode.prev;
          const next = tempNode.next;
          tempNode.prev = next;
          tempNode.next = prev;
          tempNode = next;
      }
  };