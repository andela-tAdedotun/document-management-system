import React from 'react';

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
    this.state = {
      title: '',
      content: '',
      access: 'public'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * onChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * onSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onSubmit(event) {
    event.preventDefault();
    console.log(this)
    this.props.createDocument(this.state).then(() => {
      console.log('Done, oga ade!');
    });
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          Title: <br />
          <input
            name="title"
            value={title}
            type="text"
            onChange={this.onChange}
            required
          />
        </div>
        <div>
          Content: <br />
          <textarea
            name="content"
            onChange={this.onChange}
            value={content}
            required
          />
          <br />
          <div>
            <select
              name="access"
              label="Who Can Access"
              onChange={this.onChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
          </div>
          <button type="submit"> Submit! </button>
        </div>
      </form>
    );
  }
}

DocumentEditor.propTypes = {
  createDocument: React.PropTypes.func.isRequired
};

export default DocumentEditor;
