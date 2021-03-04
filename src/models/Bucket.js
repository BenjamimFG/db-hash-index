class Bucket {
  /**
   * 
   * @param {Number} id 
   */
  constructor(id) {
    this.id = id;
    /**
     * @type {_BucketData[]}
     */
    this.data = []
  }
}

class _BucketData {
  /**
   * @param {Number} key 
   * @param {Page} page 
   */
  constructor(key, page) {
    this.key = key;
    this.page = page;
  }
}