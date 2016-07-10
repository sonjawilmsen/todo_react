import React from 'react';
import TodoItem from './TodoItem'
import $ from 'jquery';

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      itemList: [],
    };
  }

  getList() {
    let url = this.props.url;
    let component = this;

    $.ajax({
      type: 'GET',
      url: 'https://nameless-forest-85776.herokuapp.com/todos.json',
      dataType: 'json',
      error: function(){
        console.log('Error getting todo list.');
      },
      success: function(data){
        console.log(data)
        component.setState({
          itemList: data
        });
      }
    });
  }

  componentDidMount() {
    this.getList();
  }

  renderTodoItem(item, index) {
    return (
      <TodoItem
      key={index}
      id={item.id}
      title={item.title}
      completed={item.completed}
      updated_at={item.updated_at}
      id={item.id} />
    );
  }

  render() {
    let itemList = this.state.itemList.sort(function(a,b){
      return b.id - a.id}).reverse()

      return (
        <div>
        <h1>Todo List</h1>
        <ul>
        {itemList.map(this.renderTodoItem.bind(this))}
        </ul>
        </div>
      );
    }
  }

  export default TodoList;
