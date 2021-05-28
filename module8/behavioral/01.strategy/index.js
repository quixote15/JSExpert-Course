import MongoDBStrategy from './src/strategy/mongodbStrategy.js'
import PostgresStrategy from './src/strategy/postgresStrategy.js'
import ContextStrategy from './src/base/contextStrategy.js';

// Por que instanciar a estrategia passando como parametro para o contexto?
// Para que toda strategy tenha a mesma assinatura da classe Context
// Garantindo compatibilidade e definindo uma interface comum que todas as estrategias devem seguir.
const postgresConnectionString = 'postgres://quixote15:senhasenha@159.65.246.147:5432/vilains';
const mongodbConnectionString = 'mongodb://quixote15:senhamongo@159.65.246.147:27018/vilains';
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
const mongodbContext = new ContextStrategy(new MongoDBStrategy(mongodbConnectionString));

await mongodbContext.connect();
await postgresContext.connect()

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

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongodbContext
}

for(const { type, name} of data) {
  const context = contextTypes[type];
  await context.create({name: name + Date.now()});

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}