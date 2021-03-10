
class terminalRepository {
  constructor({fileAdapter, databaseFilePath}){
    this.fileAdapter = fileAdapter;
    const {pathname} = new URL(databaseFilePath, import.meta.url);
    this.databaseFilePath = pathname;
  }

  async save(data) {
    const currentData = await this.read();
    currentData.push(data);
    await this.fileAdapter.writeFile(this.databaseFilePath, JSON.stringify(currentData));
  }

  async read() {
    const data = await this.fileAdapter.readFile();
    return JSON.parse(data);
  }
}

export default terminalRepository;