import React, {Component} from 'react';
import './Form';
import './Main.css';
import Form from './Form';
import Tarefas from './Tarefas';

export default class Main extends Component{

  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  handleSubmit = (e) =>{
    e.preventDefault();
    const { tarefas, index} = this.state;
    let { novaTarefa} = this.state;
    novaTarefa = novaTarefa.trim();

    if(novaTarefa === '') return;
    if(tarefas.indexOf(novaTarefa) !== -1) return;
    const novasTarefas = [...tarefas ];

    if(index === -1){
      this.setState({
        novaTarefa: '',
        tarefas: [...novasTarefas, novaTarefa],
      });
    }else{
      const novasTarefas = [...tarefas];
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: '',
      });
    }

  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  handleDelete = (e, index) => {
    const {tarefas} = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  }

  handleEdit = (e, index) => {
    const {tarefas} = this.state;
    const inputTarefa = document.querySelector('.input-tarefa');
    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
    inputTarefa.focus();
  }

  render(){
    const {novaTarefa, tarefas} = this.state;
    return (
      <div className = "main">
        <h1>Lista de tarefas</h1>

        <Form handleSubmit = {this.handleSubmit} handleChange = {this.handleChange} novaTarefa = {novaTarefa}/>
        <Tarefas tarefas={tarefas} handleEdit={this.handleEdit} handleDelete = {this.handleDelete} />
      </div>
    );
  }
}


