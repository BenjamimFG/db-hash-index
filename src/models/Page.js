class Page {
  /**
   * @param {number} id
   * @param {number} maxSize 
   */
  constructor(id, maxSize) {
    this.id = id;
    this.maxSize = maxSize;
    /**
     * @type {Tuple[]}
     */
    this.tuples = [];
  }

  /**
   * @param {Tuple} tuple 
   */
  addTuple(tuple) {
    if (this.tuples.length >= this.maxSize)
      throw new Error('Page size limit reached.');
    else {
      this.tuples.push(tuple);
    }
  }

  /**
   * 
   * @param {string} key 
   * @returns {number}
   */
  getTupleIndexByKey(key) {
    for (const [idx, tuple] of this.tuples.entries()) {
      if (tuple.key === key)
        return idx;
    }
  }

}