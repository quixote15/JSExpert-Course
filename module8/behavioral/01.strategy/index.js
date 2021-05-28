import MongoDBStrategy from './src/strategy/mongodbStrategy.js'
import PostgresStrategy from './src/strategy/postgresStrategy.js'
import ContextStrategy from './src/base/contextStrategy.js';

// Por que instanciar a estrategia passando como parametro para o contexto?
// Para que toda strategy tenha a mesma assinatura da classe Context
// Garantindo compatibilidade e definindo uma interface comum que todas as estrategias devem seguir.
const postgresConnectionString = 'postgres://quixote15:senhasenha@159.65.246.147:5432/vilains';
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));

await postgresContext.connect();


const data = [
  {
    name: 'erickwendell',
    type: 'transaction'
  }, 
  {
    name: 'mariasilva',
    type: 'activityLog'
  }
]

await postgresContext.create({name: data[0].name})
console.log(await postgresContext.read())