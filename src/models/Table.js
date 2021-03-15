class Table {
  /**
   * @param {number} pageSize 
   * @param {number} totalPages 
   * @param {number} bucketSize 
   * @param {number} totalBuckets 
   * @param {number} initialRecordsSize initial size of data that will be inserted
   */
  constructor(pageSize, totalPages, bucketSize, totalBuckets, initialRecordsSize) {
    /**
     * @type {Tuple[]}
     */
    this.tuples = [];
    /**
     * @type {Page[]}
     */
    this.pages = [];
    /**
     * @type {Bucket[]}
     */
    this.buckets = [];
    
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.bucketSize = bucketSize;
    this.totalBuckets = totalBuckets;

    this._setNullParameters(initialRecordsSize);
    this._initializePages();
    this._initializeBuckets();

    this.metadata = {
      collisions: 0,
      overflows: 0
    }
  }

  /**
   * @param {string} key key to be searched in the table
   * @returns {Page} the page where the tuple with key `key` is located
   */
  getPageByKey(key) {
    for (const bucket of this.buckets) {
      for (const entry of bucket.data) {
        if (entry.key === key) {
          return entry.page;
        }
      }
    }

    throw new Error(`key '${key}' not found`);
  }

  getTotalOverflows() {
    let overflows = 0;

    this.buckets.forEach(bucket => {
      overflows += bucket.getOverflows();
    });
    
    return overflows;
  }

  getTotalCollisions() {
    let collisions = 0;

    this.buckets.forEach(bucket => {
      collisions += bucket.getCollisions();
    });

    return collisions;
  }

  /**
   * @param {Tuple} tuple
   */
  addTuple(tuple) {
    this.tuples.push(tuple);
    const tuplePage = this._addTupleToPages(tuple);
    this._addDataToBucket(tuple.key, tuplePage);
  }

  /**
   * Generates a hash from a `key`
   * @private
   * @param {String} key Key to generate hash from
   * @return {Number} hash generated from key
   */
  _hashingFunction(key) {
    let sum = 0;
    let charArray = key.split('');

    charArray.forEach(char => {
      sum += char.charCodeAt(0);
    });

    return sum % this.totalBuckets;
  }

  /**
   * @private
   * @param {Tuple} tuple 
   * @returns {Page}
   */
  _addTupleToPages(tuple) {
    for (let i = 0; i < this.pages.length; ++i) {
      if (this.pages[i].tuples.length < this.pages[i].maxSize) {
        this.pages[i].addTuple(tuple);
        return this.pages[i];
      }
    }

    throw Error('Total pages size exceeded');
  }

  /**
   * @private
   */
  _addDataToBucket(key, page) {
    const hash = this._hashingFunction(key);

    if (hash < 0 || hash >= this.buckets.length) {
      alert('Invalid key hash value');
      throw new Error('Invalid key hash value');
    }
    
    const bucket = this.buckets[hash];
    bucket.addData(new BucketData(key, page));
  }

  /**
   * @private
   */
  _initializePages() {
    for (let i = 0; i < this.totalPages; ++i)
      this.pages.push(new Page(i, this.pageSize));
  }

  /**
   * @private
   */
  _initializeBuckets() {
    for (let i = 0; i < this.totalBuckets; ++i)
      this.buckets.push(new Bucket(i, this.bucketSize));
  }

  /**
   * @private
   * @param {number} initialRecordsSize 
   */
  _setNullParameters(initialRecordsSize) {
    if ((this.pageSize !== null && this.totalPages !== null) || (this.pageSize === null && this.totalPages === null)) {
      alert('Please select either a page size OR total number of pages.');
      throw new Error('Please select either a page size OR total number of pages.');
    }
    if ((this.bucketSize !== null && this.totalBuckets !== null) || (this.bucketSize === null && this.totalBuckets === null)) {
      alert('Please select either a bucket size OR total number of buckets.');
      throw new Error('Please select either a bucket size OR total number of buckets.');
    }

    if (this.pageSize !== null) {
      this.totalPages = Math.ceil(initialRecordsSize / this.pageSize);
    }
    else if (this.totalPages !== null) {
      this.pageSize = Math.ceil(initialRecordsSize / this.totalPages);
    }
  
    if (this.bucketSize !== null) {
      this.totalBuckets = Math.ceil(initialRecordsSize / this.bucketSize);
    }
    else if (this.totalBuckets !== null) {
      this.bucketSize = Math.ceil(initialRecordsSize / this.totalBuckets);
    }
  }
}