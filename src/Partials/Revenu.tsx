import './css/Revenu.css'
import './css/Plus.css'
import './css/Negative.css'
import React from 'react';

import Depenses from './Depenses';

interface IMyComponentProps {
  props: object
}

interface IMyComponentState {
  salaire_total: number,
  inputList: RevenuInput[]
}

interface RevenuInput {
  sub_salaire: number
}

class Revenu extends React.Component<IMyComponentProps, IMyComponentState> {
  static defaultProps = {props:{}}
    constructor(props: any) {
      super(props);
      this.state = {
        salaire_total: 0,
        inputList: [{sub_salaire: 0}]
      };
  
      this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAddClick = this.handleAddClick.bind(this);
      this.handleRemoveClick = this.handleRemoveClick.bind(this);

    }
  
    handleChange(event: { target: { value: any; }; }, i: number) {
      const value = event.target.value;
      const list = this.state.inputList;

      list[i].sub_salaire = parseInt(value)

      this.setState({salaire_total: this.simpleArraySum(list)})
      // this.setState({salaire: event.target.value});
      this.setState({inputList: list});
      localStorage.setItem('revenu_tot_storage', JSON.stringify(this.simpleArraySum(list)));
      localStorage.setItem('revenus_storage', JSON.stringify(list));
    }

    // handle click event of the Remove button
    handleRemoveClick = (i: number) => {
      const list = this.state.inputList
      list.splice(i, 1);
      
      this.setState({inputList: list});
      localStorage.setItem('revenu_tot_storage', JSON.stringify(this.simpleArraySum(list)));
      localStorage.setItem('revenus_storage', JSON.stringify(list));
    };

    // handle click event of the Add button
    handleAddClick = (event: any, i: number) => {
      event.preventDefault()
      let list = this.state.inputList
      let lastI = list.length
      let newInput: RevenuInput = {sub_salaire: 0}


      list[lastI] = newInput
      let newList: RevenuInput[] = list

      this.setState({inputList: newList});
    };

    simpleArraySum(ar:RevenuInput[]) {
      var sum = 0;
      for (var i = 0; i < ar.length; i++) {
        sum = sum + ar[i].sub_salaire;
      }
      
      return sum;
    }

    componentDidMount() {
      if (localStorage.getItem('revenus_storage') && localStorage.getItem('revenu_tot_storage')) {
        this.setState({salaire_total: JSON.parse(localStorage.getItem('revenu_tot_storage'))});
        this.setState({inputList: JSON.parse(localStorage.getItem('revenus_storage'))});
      }
    }
  
    render() {
      return (
        <form className="global_form">
          <div className='form_section'>
            <div className='form_section-label'>
              <h4>
                Salaire
              </h4>
            </div>
            <div className='form_section-inputs'>
              {this.state.inputList.map((x, i) => {
              return (
                <div className='form_section-input'>
                <input type="number" name="salaire" onChange={e => this.handleChange(e, i)} placeholder='Montant (EUR)' value={x.sub_salaire}/>

                {this.state.inputList.length !== 1 && 
                  <div className="negative" onClick={e => this.handleRemoveClick(i)}></div>}
                {this.state.inputList.length - 1 === i && 
                  <div className="plus" onClick={e => this.handleAddClick(e, i)}></div>}
              </div>
            )}
            )}
            </div>
            
            <div className='form_section-result'>
              <div>{this.state.salaire_total}</div>
            </div>
          </div>
          <hr />
          <Depenses salaires={this.state.salaire_total} />
        </form>
      );
    }
}

export default Revenu;