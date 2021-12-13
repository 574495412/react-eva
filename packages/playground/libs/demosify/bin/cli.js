#!/usr/bin/env node
const path = require('path');

// eslint-disable-next-line import/no-unassigned-import
require('v8-compile-cache')
const Poi = require('poi')

process.on('unhandledRejection', error => {
  console.error(error)
  process.exit(1)
})

async function main() {
  try {
    const poi = new Poi(process.argv, {
      defaultConfigFiles: [path.join(__dirname, '../poi.config.js')]
    })
    await poi.run()
  } catch (error) {
    require('poi/lib/utils/spinner').stop()
    if (error.poi) {
      if (!error.dismiss) {
        require('@poi/logger').error(error.message)
      }
    } else {
      console.error(error.stack)
    }
    process.exit(1)
  }
}

main()