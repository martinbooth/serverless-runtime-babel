'use strict';

const chalk = require('chalk'),
  BbPromise = require('bluebird'),
  path      = require('path'),
  fs        = BbPromise.promisifyAll(require('fs'));

const pkg      = require(path.resolve(__dirname, '..', 'package.json')),
  sProjectPath = path.resolve(__dirname, '..', '..', '..', 's-project.json');

fs.lstatAsync(sProjectPath)
  .catch({code: 'ENOENT'}, (e) => {
    console.log(chalk.red(`Auto install failed - s-project.json is not found.`));
    console.log(`You need to manually add "${pkg.name} to your s-project.json's plugins array `);
    return false;
  })
  .then(exists => {
    if (!exists) return;

    const sProject = require(sProjectPath);

    sProject.plugins = sProject.plugins || [];

    if (sProject.plugins.indexOf(pkg.name) === -1) sProject.plugins.push(pkg.name);

    return fs.writeFileAsync(sProjectPath, JSON.stringify(sProject, null, 2))
      .then(() => console.log(chalk.green(`"${pkg.name}" successfully installed to your Serverless project!`)))
  });