let PAGE_SIZE = 4000;
let TOTAL_PAGES = null;

const table = new Table()
/**
 * @type {Page[]}
 */
const pages = []
/**
 * @type {Bucket[]}
 */
const buckets = []

console.log(hash("asdnqwesdjolkm"));

/**
 * Reads file from an HTML input to start the   
 * @param {HTMLInputElement} fileInput
 */
function readFile(fileInput) {
  const file = fileInput.files[0];
  const fileName = file.name;
  const fileExtension = fileName.match(/\..*/)[0]

  if (!fileName.endsWith('.txt')) {
    alert('Invalid file extension: ' + fileExtension + '\nPlease use .txt');
    return;
  }

  if ((notNull(PAGE_SIZE) && notNull(TOTAL_PAGES)) || (!notNull(PAGE_SIZE) && !notNull(TOTAL_PAGES))) {
    alert('Please select either a page size OR total number of pages.')
    return;
  }

  /**
   * @type {Tuple[]}
   */
  let tuples = [];

  file.text().then(text => {
    text.split('\n').forEach(word => {
      word = word.trim();
      const hash = hashingFunction(word);
      const cur_tuple = new Tuple(hash, word);
      
      tuples.push(cur_tuple);
      table.addTuple(cur_tuple);
    })
  });

  let totalPages = Math.ceil(table.tuples.length / PAGE_SIZE);
  initializePages(totalPages);
  initializeBuckets(255);
}

/**
 * Initializes the pages list with `numberOfPages` pages
 * @param {Number} numberOfPages Number of pages to be created
 */
function initializePages(numberOfPages) {
  for (let i = 0; i < numberOfPages; ++i)
    pages.push(new Page(PAGE_SIZE));
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
  const temp_total_buckets = 255;
  let sum = 0;
  key.split('').reduce((total, char) => total += char.charCodeAt(0), sum);

  return sum % temp_total_buckets;
}

/**
 * Returns true if data is defined and not null
 * @param {*} data 
 */
function notNull(data) { return data && data != null }