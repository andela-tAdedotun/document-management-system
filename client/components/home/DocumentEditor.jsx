import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import ProtectedSelect from '../common/ProtectedSelect';
import AccessSelect from '../common/AccessSelect';

/**
 *
 */
class DocumentEditor extends React.Component {
  /**
   * constructor - constructor for DocumentEditor class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: 'public',
      isProtected: 'false'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   * handleChange - handler for onChange event
   *
   * @param  {object} event - the change event
   * @return {void}
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * handleEditorChange - handles change event for TinyMCE
   *
   * @param  {type} event - the change event
   * @return {void}       none
   */
  handleEditorChange(event) {
    this.setState({
      content: event.target.getContent({ format: 'raw' })
    });
  }
  /**
   * handleSubmit - handler for submit event
   *
   * @param  {object} event - the submit event
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.createDocument(this.state).then(() => {
      Materialize.toast('Document successfully created.', 4000);
      this.setState({
        title: '',
        content: '',
        access: this.state.access
      });
    });
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    const { title, content } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            Title: <br />
            <input
              name="title"
              value={title}
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <TinyMCE
            content={content}
            config={{
              height: 300,
              plugins: 'link image code',
              toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
          />
          <div>
            <AccessSelect handleChange={this.handleChange} />
          </div>

          <div>
            <ProtectedSelect handleChange={this.handleChange} />
          </div>
          <br />
          <button
            id="submit"
            className="btn cyan"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button className="btn red modal-close close-modal">Close</button>
      </div>
    );
  }
}

DocumentEditor.propTypes = {
  createDocument: PropTypes.func.isRequired
};

export default DocumentEditor;
