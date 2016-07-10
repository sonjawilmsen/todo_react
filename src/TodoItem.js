import React from 'react';
import $ from 'jquery';

class TodoItem extends React.Component {
  constructor(){
    super();

    this.state = {
    };
  }

  updateItem(newState) {
    let url = this.props.url;
    let component = this;

    $.ajax({
      type: 'PUT',
      url: 'https://nameless-forest-85776.herokuapp.com/todos' + this.props.id + '.json',
      data: JSON.stringify({
        todo: newState
      }),
      contentType: 'application/json',
      dataType: 'json',
      error: function(){
        console.log('Error updating todo.');
      },
      success: function(){
        console.log('Succeeded updating todo.')
      }
    });
  }

  destroyItem() {
    let url = this.props.url;
    let component = this;

    $.ajax({
      type: 'DELETE',
      url: 'https://nameless-forest-85776.herokuapp.com/todos' + this.props.id + '.json',
      contentType: 'application/json',
      dataType: 'json',
      error: function(){
        console.log('Error deleting todo.');
      },
      success: function(){
        console.log('Succeeded deleting todo.')
      }
    });
  }

  render() {
    return (
      <div>
      <label><input type="checkbox" checked={this.props.completed} onChange={this.toggleCompleted.bind(this)}/>{this.props.title}</label>
      </div>
    );
  }

  toggleCompleted() {
    let newState = {
      title: this.props.title,
      completed: !this.props.completed
    };
    this.updateItem(newState)
    forceUpdate()
  }
}

export default TodoItem;
