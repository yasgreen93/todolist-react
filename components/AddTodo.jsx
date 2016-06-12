module.exports = React.createClass({
  getInitialState: function() {
    return {text: '', tag: '', completed: false};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleTagChange: function(e) {
    this.setState({tag: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    var tag = this.state.tag.trim();
    var completed = false;
    if(!text || !tag) {
      return;
    }
    this.props.onTodoSubmit({text: text, tag: tag, completed: completed});
    this.setState({text: '', tag: ''});
  },
  render: function() {
    return (
      <form className="AddTodoForm" onSubmit={this.handleSubmit} id="addTodoForm">
        <input
          id="addTodoText"
          type="text"
          placeholder="Add a Todo"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          id="addTodoTag"
          type="text"
          placeholder="Tag your Todo"
          value={this.state.tag}
          onChange={this.handleTagChange}
        />
        <input id="addTodoSubmit" type="submit" value="Add" />
      </form>
    );
  }
});
