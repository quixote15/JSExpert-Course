\n\nimport TerminalController from './terminalController.js'
import Person from './Person.js'
import database from './../database.json'
import fileAdapter from 'fs/promises'
import terminalRepository from './repository.js'

const databaseFilePath = './../database.json';
repository = new terminalRepository({fileAdapter, databaseFilePath});
//const DEFAULT_LANG = "en"
//const DEFAULT_LANG = "es"
//const DEFAULT_LANG = "rus"
const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"
const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANG)


async function mainLoop() {
  try {
    const answer = await terminalController.question();
 
    if(answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process finished')
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    await repository.save(person);
    return mainLoop()
  } catch (error) {
    console.log('Deu ruim: ',error);
    return mainLoop()
  }
}
//1 Bike,Aviao,Navio 20000000 2000-01-01 2002-02-01
// 2 Moto,carro 300000 2020-01-01 2020-01-03
// 3 Moto,carro 300000 2020-01-01 2020-01-03
// 4 Moto,carro 300000 2020-01-01 2020-01-03
await mainLoop()
/*setInterval(() => {
  database.push({id: Date.now(), vehicles: ['Test' + Date.now()]});
  const table = chalkTable(options, database);
  print(table)
}, 400)*/

