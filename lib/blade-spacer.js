'use babel';

import { CompositeDisposable } from 'atom';

export default {
  config: {
    'workInAllFiles': {
      title: 'Enable in all files',
      description: `By default this
      package works only in files using
      Blade syntax. Enable this to turn
      on this package in all files.`,
      type: 'boolean',
      default: false
    }
  },

  activate(state) {

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.observeTextEditors(editor => {
      this.subscriptions.add(
        editor.onDidInsertText((e) => {

          if (( ! atom.config.get('blade-spacer.workInAllFiles')
          && editor.getGrammar().name !== 'Blade' )
          || e.text !== '{}'
          && e.text !== '!') return;

          this.runSpacer(editor);
        })
      );
    }));

  },

  deactivate() {
    this.subscriptions.dispose();
  },

  runSpacer(editor) {
    let curRange = editor.getCursorBufferPosition();
    let range = [[curRange.row, curRange.column - 3], [curRange.row, curRange.column + 1]];
    let range2 = [[curRange.row, curRange.column - 2], [curRange.row, curRange.column + 1]];
    if (editor.getTextInBufferRange(range) === '{{}}') {
      editor.setTextInBufferRange(range, '{{  }}');
      editor.getLastCursor().moveLeft(2);
    } else if (editor.getTextInBufferRange(range2) === '{!}') {
      editor.setTextInBufferRange(range2, '{!!  !!}');
      editor.getLastCursor().moveLeft(4);
    }
  }
};
