\n\nimport 'fs/promises';
export default class terminalRepository {
  constructor({fileAdapter, databaseFilePath}){
    this.fileAdapter = fileAdapter;
    const {pathname: databasePath} = new URL(databaseFilePath, import.meta.url);
    this.databaseFilePath = databasePath;
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