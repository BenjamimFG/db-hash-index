/**
 * @type {Table}
 */
let table;

/**
 * Reads file from an HTML input to start the table insertion
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

  file.text().then(text => {
    const words =  text.split('\n');

    table = new Table(
      Number.parseInt(document.querySelector('#page-size').value) || null,
      Number.parseInt(document.querySelector('#total-pages').value) || null,
      Number.parseInt(document.querySelector('#bucket-size').value) || null,
      Number.parseInt(document.querySelector('#total-buckets').value) || null,
      words.length
    );

    words.forEach(word => {
      word = word.trim();
      // const hash = hashingFunction(word);
      const currentTuple = new Tuple(word, word);
      
      table.addTuple(currentTuple);
    })
  }).then(_ => {
    debugLogState();
    logPages();
    logBuckets();
  });
}

function debugLogState() {
  console.log("total tuples: " + table.tuples.length, "\npage size: " + table.pageSize, "\ntotal pages: " + table.totalPages, "\nbucket size: " + table.bucketSize, "\ntotal buckets: " + table.totalBuckets);
  console.log('overflows: ' + table.getTotalOverflows() + '\ncollisions: ' + table.getTotalCollisions());
}

function logPages() {
  table.pages.forEach(page => {
    console.log(`Page ${page.id} (${page.tuples.length} tuples):`);
    page.tuples.forEach(tuple => {
      console.log(`  key: ${tuple.key}, data: ${tuple.data}`);
    });
  });
}

function logBuckets() {
  table.buckets.forEach(bucket => {
    logBucket(bucket);
  });
}

/**
 * @param {Bucket} bucket 
 */
function logBucket(bucket, level = 0) {
  console.log('  '.repeat(level) + `bucket ${level > 0 ? `overflow ${level - 1}` : bucket.id} (${bucket.getTotalSize()} entries):`);
  bucket.data.forEach(data => {
    console.log('  '.repeat(level + 1) + `key: ${data.key}, page: ${data.page.id}`);
  });
  if (bucket.bucketOverflow !== null) {
    logBucket(bucket.bucketOverflow, ++level);
  }
}