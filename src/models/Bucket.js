class Bucket {
  /**
   * @param {Number} id bucket id
   * @param {Number} maxSize bucket max size 
   */
  constructor(id, maxSize) {
    this.id = id;
    /**
     * @type {_BucketData[]}
     */
    this.data = [];
    this.maxSize = maxSize;
    this.bucketOverflow = null;
  }

  /**
   * Adds data to the bucket
   * @param {_BucketData} data data to be added to the bucket
   */
  addData(data) {
    if (this.data < this.maxSize) {
      this.data.push(data);
      return;
    }
    if (this.bucketOverflow = null)
      this.bucketOverflow = new Bucket(this.id, this.maxSize);
      
    this.bucketOverflow.data.push(data);
  }
}

/**
 * Type definition for the data that `Bucket` stores. 
 */
class _BucketData {
  /**
   * @param {Number} value data index value
   * @param {Page} page pointer to the database Page that holds the data Tuple
   */
  constructor(value, page) {
    this.key = value;
    this.page = page;
  }
}