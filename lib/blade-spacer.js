'use babel';

import { CompositeDisposable } from 'atom';

export default {
  activate(state) {

    this.subscriptions = new CompositeDisposable();

    let editor = atom.workspace.getActiveTextEditor();

    this.subscriptions.add(

      editor.onDidInsertText((e) => {
        if (e.text === '{}') {
          let curRange = editor.getCursorBufferPosition();
          let range = [[curRange.row, curRange.column - 3], [curRange.row, curRange.column + 2]]
          if (editor.getTextInBufferRange(range) === '{{}}') {
            editor.setTextInBufferRange(range, '{{  }}');
            editor.getLastCursor().moveLeft(2);
          }
        }
      })

    );
  },

  deactivate() {
    this.subscriptions.dispose();
  }
};
