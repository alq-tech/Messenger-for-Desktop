import cp from 'child_process';
import path from 'path';
import app from 'app';

class SquirrelEvents {

  check(options) {
    if (options.squirrelInstall) {
      this.spawnSquirrel(['--createShortcut', app.getPath('exe')], app.quit);
      return true;
    }

    if (options.squirrelUpdated || options.squirrelObsolete) {
      app.quit();
      return true;
    }

    if (options.squirrelUninstall) {
      this.spawnSquirrel(['--removeShortcut', app.getPath('exe')], app.quit);
      return true;
    }

    return false;
  }

  spawnSquirrel(args, callback) {
    const squirrelExec = path.join(path.dirname(app.getPath('exe')), 'Update.exe');
    log('spawning', squirrelExec, args);

    const child = cp.spawn(squirrelExec, args, { detached: true });
    child.on('close', function(code) {
      if (code) {
        console.error(squirrelExec, 'exited with code', code);
      } else {
        callback();
      }
    });
  }

}

export default new SquirrelEvents();
