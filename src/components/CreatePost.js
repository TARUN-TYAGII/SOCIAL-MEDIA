import React, { Component } from "react";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleChange = (e) => {
    e.preventdefault();
    this.setState({
      content: e.target.value,
    });
  };

  //   handleOnClick = () => {
  //     this.props.dispatch;
  //   };
  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <div>
          <button id="add-post btn" onClick={this.handleOnClick}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ post }) {
  return {
    post,
  };
}

export default CreatePost;
