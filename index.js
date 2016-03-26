"format cjs";

var wrap = require('word-wrap');

module.exports = {

  // When a user runs `git cz`, prompter will
  // be executed. We pass you cz, which currently
  // is just an instance of inquirer.js. Using
  // this you can ask questions and get answers.
  //
  // The commit callback should be executed when
  // you're ready to send back a commit template
  // to git.
  //
  // By default, we'll de-indent your commit
  // template and will keep empty lines.
  prompter: function(cz, commit) {

    console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n');

    // Let's ask some questions of the user
    // so that we can populate our commit
    // template.
    //
    // See inquirer.js docs for specifics.
    // You can also opt to use another input
    // collection library if you prefer.
    cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of change that you\'re committing:',
        choices: [
          {
            name: 'feat:     A new feature',
            value: 'feat'
          },
          {
            name: 'fix:      A bug fix',
            value: 'fix'
          },
          {
            name: 'content:  A static content change',
            value: 'content'
          },
          {
            name: 'docs:     Documentation only changes',
            value: 'docs'
          },
          {
            name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
            value: 'style'
          },
          {
            name: 'refactor: A code change that neither fixes a bug or adds a feature',
            value: 'refactor'
          },
          {
            name: 'perf:     A code change that improves performance',
            value: 'perf'
          },
          {
            name: 'test:     Adding missing tests',
            value: 'test'
          },
          {
            name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
            value: 'chore'
          }
        ]
      },
      {
        type: 'input',
        name: 'subject',
        message: 'Write a short, imperative tense description of the change:\n'
      },
      {
        type: 'input',
        name: 'body',
        message: 'Provide a longer description of the change:\n'
      },
      {
        type: 'input',
        name: 'breaking',
        message: 'List any breaking changes:\n'
      },
      {
        type: 'input',
        name: 'footer',
        message: 'Reference any task that this commit closes:\n'
      }
    ], function (answers) {

      var maxLineWidth = 100;

      var wrapOptions = {
        trim: true,
        newline: '\n',
        indent:'',
        width: maxLineWidth
      };

      // Hard limit this line
      var head = (answers.type + ': ' + answers.subject.trim()).slice(0, maxLineWidth);

      // Wrap these lines at 100 characters
      var body = wrap(answers.body, wrapOptions);
      var breaking = wrap(answers.breaking, wrapOptions);
      var footer = wrap(answers.footer, wrapOptions);

      var msg = head;
      if (body) {
        msg += '\n\n' + body;
      }
      if (breaking) {
        msg += '\n\n' + 'BREAKING CHANGE: ' + breaking;
      }
      if (footer) {
        msg += '\n\n' + footer;
      }
      commit(msg);
    });
  }
}
