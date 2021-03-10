class Bucket {
  /**
   * @param {Number} id bucket id
   * @param {Number} maxSize bucket max size 
   */
  constructor(id, maxSize) {
    this.id = id;
    /**
     * @type {BucketData[]}
     */
    this.data = [];
    this.maxSize = maxSize;
    this.bucketOverflow = null;
  }

  /**
   * Adds data to the bucket
   * @param {BucketData} data data to be added to the bucket
   */
  addData(data) {
    if (this.data.length < this.maxSize) {
      this.data.push(data);
      return;
    }
    if (this.bucketOverflow == null)
      this.bucketOverflow = new Bucket(this.id, this.maxSize);
      
    this.bucketOverflow.addData(data);
  }

  /**
   * @returns {number}
   */
  getTotalSize() {
    let size = 0;

    size += this.data.length;
    if (this.bucketOverflow !== null) {
      size += this.bucketOverflow.getTotalSize();
    }

    return size;
  }

  /**
   * @returns {number} 
   */
  getOverflowSize() {
    let size = 0;
    
    if (this.bucketOverflow !== null) {
      size += this.bucketOverflow.getTotalSize();
    }

    return size;
  }
}

/**
 * Type definition for the data that `Bucket` stores. 
 */
class BucketData {
  /**
   * @param {number} key data key value
   * @param {Page} page pointer to the database Page that holds the data Tuple
   */
  constructor(key, page) {
    this.key = key;
    this.page = page;
  }
}