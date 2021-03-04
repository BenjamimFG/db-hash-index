
class Table {
  constructor() {
    this.tuples = [];
    this.metadata = {
      pageSize: undefined,
      totalPages: undefined,
      bucketSize: undefined,
      totalBuckets: undefined,
      collisions: 0,
      overflows: 0
    }
  }

  /**
   * 
   * @param {Number} tuple
   */
  addTuple(tuple) {
    this.tuples.push(tuple);
  }
}