class Page {

  /**
   * 
   * @param {number} maxSize 
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.tuples = [];
  }

  /**
   * 
   * @param {Tuple} tuple 
   */
  addTuple(tuple) {
    if (this.tuples.length >= this.maxSize)
      throw new Error('Page size limit reached.');
    else {
      this.tuples.push(tuple);
    }
    
  }

}