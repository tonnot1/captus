import './css/Revenu.css'
import React from 'react';
import Restant from './Restant';

interface IMyComponentProps {
  props: object,
  salaires: number
}

interface IMyComponentState {
  depense_total: number,
  inputList: DepenseInput[],
  credit_total: number,
  inputCreditList: CreditInput[]
}

interface DepenseInput {
  title: string
  sub_depense: number
}

interface CreditInput {
  title: string
  sub_credit: number
  fin_credit: string
}

class Depenses extends React.Component<IMyComponentProps, IMyComponentState> {
  static defaultProps = {props:{}}
    constructor(props: any) {
      super(props);
      this.state = {
        depense_total: 0,
        inputList: [{title: '', sub_depense: 0}],
        credit_total: 0,
        inputCreditList: [{title: '', sub_credit: 0, fin_credit:'0000-00'}]
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleAddClick = this.handleAddClick.bind(this);
      this.handleRemoveClick = this.handleRemoveClick.bind(this);
    }
  
    handleChange(event: { target: { value: any; }; }, i: number, type: string) {
      const value = event.target.value;
      let list = type.includes('credit') ? this.state.inputCreditList : this.state.inputList;

      switch (type) {
        case 'depense_title':
          list = this.state.inputList;
          list[i].title = value

          this.setState({inputList: list});
          localStorage.setItem('depenses_storage', JSON.stringify(list));
        break;
        case 'depense_montant':
          list = this.state.inputList;
          list[i].sub_depense = parseInt(value)

          this.setState({depense_total: this.simpleArraySum(list, 'depense')})
          this.setState({inputList: list});

          localStorage.setItem('depense_tot_storage', JSON.stringify(this.simpleArraySum(list, 'depense')));
          localStorage.setItem('depenses_storage', JSON.stringify(list));
        break;
        case 'credit_title':
          list = this.state.inputCreditList;
          list[i].title = value

          this.setState({inputCreditList: list});
          localStorage.setItem('credits_storage', JSON.stringify(list));
        break;
        case 'credit_montant':
          list = this.state.inputCreditList;
          list[i].sub_credit = parseInt(value)

          this.setState({credit_total: this.simpleArraySum(list, 'credit')})
          this.setState({inputCreditList: list});

          localStorage.setItem('credit_tot_storage', JSON.stringify(this.simpleArraySum(list, 'credit')));
          localStorage.setItem('credits_storage', JSON.stringify(list));
          
        break;
        case 'credit_date':
          list = this.state.inputCreditList;
          list[i].fin_credit = value
          this.setState({inputCreditList: list});
          localStorage.setItem('credits_storage', JSON.stringify(list));
        break;  
      }
    }
    
    simpleArraySum(ar:any, type: string) {
      var sum = 0;
      for (var i = 0; i < ar.length; i++) {
        if (type === 'credit') {
          sum = sum + ar[i].sub_credit;
        } else {
          sum = sum + ar[i].sub_depense;
        }
      }
      
      return sum;
    }

    // handle click event of the Remove button
    handleRemoveClick = (i: number, type: string) => {

      if (type === 'credit') {
        const list = this.state.inputCreditList
        list.splice(i, 1);
        this.setState({inputCreditList: list});
      } else {
        const list = this.state.inputList
        list.splice(i, 1);
        this.setState({inputList: list});
      }
    };

     // handle click event of the Add button
    handleAddClick = (event: any, i: number, type: string) => {
      event.preventDefault()

      if (type === 'credit') {
        let list = this.state.inputCreditList
        let lastI = list.length
        let newInput: CreditInput = {title:'', sub_credit: 0, fin_credit: '0000-00'}
  
        list[lastI] = newInput
        let newList: CreditInput[] = list
  
        this.setState({inputCreditList: newList});
      } else {
        let list = this.state.inputList
        let lastI = list.length
        let newInput: DepenseInput = {title:'', sub_depense: 0}

        list[lastI] = newInput
        let newList: DepenseInput[] = list

        this.setState({inputList: newList});
      }

    };

    componentDidMount() {
      if (localStorage.getItem('depenses_storage') && localStorage.getItem('depense_tot_storage')) {
        this.setState({depense_total: JSON.parse(localStorage.getItem('depense_tot_storage'))});
        this.setState({inputList: JSON.parse(localStorage.getItem('depenses_storage'))});
      }
      if (localStorage.getItem('credits_storage') && localStorage.getItem('credit_tot_storage')) {
        this.setState({credit_total: JSON.parse(localStorage.getItem('credit_tot_storage'))});
        this.setState({inputCreditList: JSON.parse(localStorage.getItem('credits_storage'))});
      }

    }
  
    render() {
      return (
        <>
          <div className='form_section'>
            <div className='form_section-label'>
              <h4>
                Depenses
              </h4>
            </div>

            <div className='form_section-inputs'>
            {this.state.inputList.map((x, i) => {
              return (
                <div className='form_section-input'>
                  <input type="text" name="depense_label" onChange={e => this.handleChange(e, i, 'depense_title')} placeholder='Titre' value={x.title} />
                  <input type="number" name="depense_montant" onChange={e => this.handleChange(e, i, 'depense_montant')} placeholder='Montant (EUR)' value={x.  sub_depense}/>

                  {this.state.inputList.length !== 1 && 
                    <div className="negative" onClick={e => this.handleRemoveClick(i, 'depense')}></div>}
                  {this.state.inputList.length - 1 === i && 
                    <div className="plus" onClick={e => this.handleAddClick(e, i, 'depense')}></div>}
              </div>
            )}
            )}
            </div>

            <div className='form_section-result'>
              <div>{this.state.depense_total}</div>
            </div>
          </div>
          <hr />
        
          <div className='form_section'>
            <div className='form_section-label'>
              <h4>
                Credits
              </h4>
            </div>
            
            <div className='form_section-inputs'>
            {this.state.inputCreditList.map((x, i) => {
              return (
                <div className='form_section-input'>
                  <input type="text" name="credit_label" onChange={e => this.handleChange(e, i, 'credit_title')} placeholder='Titre' value={x.title} />
                  <input type="number" name="montant_credit" onChange={e => this.handleChange(e, i, 'credit_montant')} value={x.sub_credit}/>
                  
                  <input type="month" name="fin_credit" onChange={e => this.handleChange(e, i, 'credit_date')} value={x.fin_credit}/>

                  {this.state.inputCreditList.length !== 1 && 
                    <div className="negative" onClick={e => this.handleRemoveClick(i, 'credit')}></div>}
                  {this.state.inputCreditList.length - 1 === i && 
                    <div className="plus" onClick={e => this.handleAddClick(e, i, 'credit')}></div>}
              </div>
            )}
            )}
            </div>

            <div className='form_section-result'>
              <div>{this.state.credit_total}</div>
            </div>
          </div>
          
          <hr />
          <Restant salaires={this.props.salaires} depenses={this.state.depense_total} credits={this.state.credit_total} />
        </>
      );
    }
}

export default Depenses;