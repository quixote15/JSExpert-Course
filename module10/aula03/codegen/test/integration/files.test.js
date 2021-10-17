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
import { createFiles } from '../../src/createFiles'
import  Util from '../../src/util'
 function generateFilePath({mainPath, defaultMainFolder, layers, componentName}) {
    return layers.map(layer => {
        // factory
        // src/factory/heroesFactory.js
        const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
        // mainPath: /Documents/project/jsexpert
        // defaultMainFolder: src
        // layer : /factory
        // filename: heroesFactory.js
        return join(mainPath, defaultMainFolder, layer, filename)
    })
}

function getAllfunctionsFromInstance(instance) {
    return Reflect.ownKeys(Reflect.getPrototypeOf(instance))
        .filter(method => method !== 'constructor')
}

describe('#Integration - Files - Files Structure', () => {

    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // colocamos sort por que o sistema operacional retorna as pastas em ordem alfabética
        layers: ['service', 'factory', 'repository'].sort(),
        componentName: 'heroes'
    }
    // Como não obtivemos o obtivemos o caminho relativo, estamos pensando que o comanda
    // vai rodar do package.json que está na raiz, po isso, iniciamos pegando da pasta test
    const packageJSON = 'package.json'
    const packageJSONLocation = join('./test/integration/mocks', packageJSON)
    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
        await fsPromises.copyFile(packageJSONLocation, join(config.mainPath, packageJSON ))
        await createLayersIfNotExists(config)

    })

    afterAll(async() => { 
       await fsPromises.rm(config.mainPath, {recursive: true})
    })

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('Repository class should have create, red, update and delete methods', async() => {
        const myConfig = {
            ...config,
            layers: ['repository']
        }

        await createFiles(myConfig)
        const [repositoryFile] = generateFilePath(myConfig)
        const {default: Repository} = await import(repositoryFile)

        const instance = new Repository()
        const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual('method not implemented!')

        expectNotImplemented(instance.create)
        expectNotImplemented(instance.read)
        expectNotImplemented(instance.update)
        expectNotImplemented(instance.delete)
    })
    test('Service class should have same signature of repository and call its methods', async() => {
        const myConfig = {
            ...config,
            layers: ['repository','service']
        }

        await createFiles(myConfig)
        const [repositoryFile,serviceFile] = generateFilePath(myConfig)
        const {default: Repository} = await import(repositoryFile)
        const {default: Service} = await import(serviceFile)
        const repository = new Repository()
        const service = new Service({repository})

        const allRepositoryMethods = getAllfunctionsFromInstance(repository)
        allRepositoryMethods.forEach(method => jest.spyOn(repository, method).mockResolvedValue())

        //executa todos os metodos do service
        getAllfunctionsFromInstance(service)
            .forEach(method => service[method].call(service, []))

        allRepositoryMethods.forEach(method => expect(repository[method]).toHaveBeenCalled())    

    })

    test('Factory instance should match layers ', async() => {
        const myConfig = {
            ...config
        }

        await createFiles(myConfig)
        const [factoryFile, repositoryFile,serviceFile] = generateFilePath(myConfig)
        const {default: Repository} = await import(repositoryFile)
        const {default: Service} = await import(serviceFile)
        const {default: Factory} = await import(factoryFile)
        
        const expectedInstance = new Service({repository: new Repository()})
        const service = Factory.getInstance()

        expect(service).toMatchObject(expectedInstance)
        expect(service).toBeInstanceOf(Service)
        
    })

})


