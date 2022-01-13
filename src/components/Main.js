import React, {Component} from 'react';
import './Main.css';

//form
import {FaPlus} from 'react-icons/fa';

// Tarefas
import {FaEdit, FaWindowClose} from 'react-icons/fa';

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

        <form className="form" onSubmit={this.handleSubmit}>
          <input className='input-tarefa' onChange={this.handleChange} type="text" value={novaTarefa}></input>
          <button type = "submit">
            < FaPlus/>
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>{tarefa}

              <span>
                <FaEdit onClick={(e) => this.handleEdit(e, index)}  className='edit'/>
                <FaWindowClose onClick={(e) => this.handleDelete(e, index)} className='remove'/>
              </span>

            </li>
          ))}
        </ul>
      </div>
    );
  }
}


