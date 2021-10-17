#!/usr/bin/env node

import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import { createFiles } from './createFiles.js'
import { createLayersIfNotExists } from './createLayers.js'

const { argv: {componentName} } = yargs(hideBin(process.argv))

    .command('skeleton', 'creates a project skeleton', (builder) => {

        return builder
            .option('component-name', {
                alias: 'c',
                demandOption: true,
                describe: 'component\'s name',
                type: 'array'
            })

            .example('skeleton --component-name product', 'creates a project with a single domain')
            .example('skeleton -c product -c person -c colors', 'creates a project with a list of domain')

    })
    .epilog('copyright 2021 - Tiago Santos Corporation')


const env = process.env.NODE_ENV

const defaultMainFolder = env === 'dev' ? 'tmp' : 'src'

const layers = ['repository', 'service', 'factory'].sort()

const config = {
    layers,
    defaultMainFolder,
    mainPath: '.',
}

await createLayersIfNotExists(config)

const pendingPromises = []

for(const domain of componentName) {

    const result = createFiles({
        ...config,
        componentName: domain
    })

    pendingPromises.push(result)
}
await Promise.all(pendingPromises)