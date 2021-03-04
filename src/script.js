const table = new Table()
/**
 * @type {Page[]}
 */

table.metadata.pageSize = Number.parseInt(document.querySelector('#page-size').value) || null;
table.metadata.totalPages = Number.parseInt(document.querySelector('#total-pages').value) || null;
table.metadata.bucketSize = Number.parseInt(document.querySelector('#bucket-size').value) || null;
table.metadata.totalBuckets = Number.parseInt(document.querySelector('#total-buckets').value) || null;

const pages = []
/**
 * @type {Bucket[]}
 */
const buckets = []

/**
 * Reads file from an HTML input to start the   
 * @param {HTMLInputElement} fileInput
 */
function readFile(fileInput) {
  const file = fileInput.files[0];
  const fileName = file.name;
  const fileExtension = fileName.match(/\..*/)[0];

  if (!fileName.endsWith('.txt')) {
    alert('Invalid file extension: ' + fileExtension + '\nPlease use .txt');
    return;
  }

  if ((table.metadata.pageSize !== null && table.metadata.totalPages !== null) || (table.metadata.pageSize === null && table.metadata.totalPages === null)) {
    alert('Please select either a page size OR total number of pages.');
    return;
  }

  /**
   * @type {Tuple[]}
   */
  // let tuples = [];

  file.text().then(text => {
    text.split('\n').forEach(word => {
      word = word.trim();
      const hash = hashingFunction(word);
      const cur_tuple = new Tuple(hash, word);
      
      // tuples.push(cur_tuple);
      table.addTuple(cur_tuple);
    })
  }).then(_ => {
    if ((table.metadata.bucketSize !== null && table.metadata.totalBuckets !== null) || (table.metadata.bucketSize === null && table.metadata.totalBuckets === null)) {
      alert('Please select either a bucket size OR total number of buckets.');
      return;
    }
  
    if (table.metadata.pageSize !== null) {
      table.metadata.totalPages = Math.ceil(table.tuples.length / table.metadata.pageSize);
    }
    else if (table.metadata.totalPages !== null) {
      table.metadata.pageSize = Math.ceil(table.tuples.length / table.metadata.totalPages);
    }
  
    if (table.metadata.bucketSize !== null) {
      table.metadata.totalBuckets = Math.ceil(table.tuples.length / table.metadata.bucketSize);
    }
    else if (table.metadata.totalBuckets !== null) {
      table.metadata.bucketSize = Math.ceil(table.tuples.length / table.metadata.totalBuckets);
    }
  
    debugLogState();
  
    initializePages(table.metadata.totalPages);
    initializeBuckets(255);
  });
}

/**
 * Initializes the pages list with `numberOfPages` pages
 * @param {Number} numberOfPages Number of pages to be created
 */
function initializePages(numberOfPages) {
  for (let i = 0; i < numberOfPages; ++i)
    pages.push(new Page(table.metadata.pageSize));
}

/**
 * Initializes the buckets list with `numberOfBuckets` buckets
 * @param {Number} numberOfBuckets Number of buckets to be created
 */
function initializeBuckets(numberOfBuckets) {
  for (let i = 0; i < numberOfBuckets; ++i)
    buckets.push(new Bucket(i));
}

/**
 * Generates a hash from a `key`
 * @param {String} key Key to generate hash from
 * @return {Number} hash generated from key
 */
function hashingFunction(key) {
  let sum = 0;
  key.split('').reduce((total, char) => total += char.charCodeAt(0), sum);

  return sum % table.metadata.totalBuckets;
}

function debugLogState() {
  console.log("total tuples: " + table.tuples.length, "\npage size: " + table.metadata.pageSize, "\ntotal pages: " + table.metadata.totalPages, "\nbucket size: " + table.metadata.bucketSize, "\ntotal buckets: " + table.metadata.totalBuckets);
}