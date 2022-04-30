import { exec } from "child_process";

const sleep = timeout => new Promise(resolve => setTimeout(() => resolve(), timeout));

class ServerData {
  constructor() {
    this._process = null;
    this._lastCommand = null;
  }

  get process() {
    return this._process;
  }

  async setProcess(newValueSetter) {
    if (this._process !== null) {
      exec(`kill -9 ${this._process.pid}`);
      exec(`kill -9 ${this._process.pid + 1}`);
      await sleep(2500);
    }

    await(2500);
    this._process = newValueSetter();
  }
}

const server = new ServerData();

async function _setup() {
  await server.setProcess(() => exec('node src/app'));
  server.process.stdout.on('data', chunk => console.log(chunk.toString()));
  server.process.stderr.on('data', chunk => console.log(chunk.toString()));
  await sleep(2000);
}

async function end() {
  await server.setProcess(() => null);
}

export {
  server,
  _setup,
  end
}
