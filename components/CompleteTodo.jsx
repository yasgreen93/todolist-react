module.exports = React.createClass({
  getInitialState: function() {
    return {id: this.props.id};
  },
  handleUpdate: function(e) {
    e.preventDefault();
    this.props.onTodoUpdate({id: e.target.name});
  },
  render: function() {
    var todo = this.props.todo;
    var id = todo.id;
    return (
        <input
          type="Submit"
          name={id}
          className="buttons"
          value="Complete Todo"
          id="CompleteTodo"
          readOnly
          onClick={this.handleUpdate}
        />
    );
  }
});
