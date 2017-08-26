// IO
const path = require('path')
const glob = require('glob')
const { removeSync, mkdirpSync, readFileSync, outputFileSync, copySync } = require('fs-extra')

// Handlebars
const { compile } = require('handlebars')

const TMP_FOLDER = path.resolve('tmp')
const TEST_FILES = glob.sync('test/**/*.test.js').map(match => path.relative('test', match))

// Step 1: create the tmp folder
removeSync(TMP_FOLDER) && mkdirpSync(TMP_FOLDER)

// Step 2: generate and copy the testbed html file
const testbed = compile(readFileSync(path.resolve(__dirname, 'testbed.hbs'), 'utf-8'))

outputFileSync(
  path.resolve(TMP_FOLDER, 'index.html'),
  testbed({ scripts: TEST_FILES }),
  'utf-8'
)

// Step 3: Copy demo files
copySync('test/audio-files', path.resolve(TMP_FOLDER, 'audio-files'))
