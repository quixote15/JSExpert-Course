import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
    beforeAll,
    afterAll
} from '@jest/globals'

// abstrai o gerenciamento do temp dir de cada operational system
import {tmpdir} from 'os'
import fsPromises from 'fs/promises'
import {join} from 'path'
import { createLayersIfNotExists } from '../../src/createLayers'

async function getFolders({mainPath, defaultMainFolder}) {
    return await fsPromises.readdir(join(mainPath, defaultMainFolder))
}

describe('#Layers - Files Structure', () => {

    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // colocamos sort por que o sistema operacional retorna as pastas em ordem alfabética
        layers: ['service', 'factory', 'repository'].sort()
    }
    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
      
    })

    afterAll(async() => {
        await fsPromises.rm(config.mainPath, {recursive: true})
    })

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })
    test('should create folders if it doesnt exists', async() => {
        const beforeRun = await fsPromises.readdir(config.mainPath)

        // run 

        await createLayersIfNotExists(config)
        const afterRun = await getFolders(config)
        expect(beforeRun).not.toStrictEqual(afterRun)
        expect(afterRun).toEqual(config.layers)
    })


    test('should not create folders if it exists', async() => {
        const beforeRun = await getFolders(config)

        await createLayersIfNotExists(config)
        const afterRun = await getFolders(config)
        expect(beforeRun).toEqual(afterRun)

    })

})


