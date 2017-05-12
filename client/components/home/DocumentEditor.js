import React from 'react';
// import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';


/**
 *
 */
class DocumentEditor extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    return (
      <div style={{ 'border': '2px solid black' }}>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default DocumentEditor;
