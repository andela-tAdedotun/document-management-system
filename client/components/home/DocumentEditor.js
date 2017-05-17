import React from 'react';
import { Row, Input } from 'react-materialize';

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
    // console.log('tayelolu', Store.getState());
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
            className="materialize-textarea"
            name="content"
            onChange={this.onChange}
            value={content}
            required
          />
          <br />
        </div>

        <div>
          <Row>
            <Input
              s={12}
              type="select"
              name="access"
              label="Who Can Access"
              onChange={this.onChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </Input>
          </Row>
        </div>
        <button className="btn blue" type="submit"> Submit! </button>
      </form>
    );
  }
}

DocumentEditor.propTypes = {
  createDocument: React.PropTypes.func.isRequired
};

export default DocumentEditor;
