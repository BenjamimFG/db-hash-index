class Table {
  constructor() {
    /**
     * @type {Tuple[]}
     */
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
   * @param {Tuple} tuple
   */
  addTuple(tuple) {
    this.tuples.push(tuple);
  }
}