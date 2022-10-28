import React from 'react';
import Objectifs from './Objectifs';
//import './css/Restant.css'

interface IMyComponentProps {
    props: object,
    depenses: number,
    credits: number,
    salaires: number
  }
  
  interface IMyComponentState {
    restant: number
  }

class Restant extends React.Component<IMyComponentProps, IMyComponentState> {
    static defaultProps = {props:{}}
    constructor(props: any) {
      super(props);
      this.state = {
        restant: 0
      };
    }

    componentDidUpdate(previousProps:any, previousState:any) {
        if ((previousProps.salaires !== this.props.salaires) || (previousProps.depenses !== this.props.depenses) || (previousProps.credits !== this.props.credits)) {
            let calc = this.props.salaires - this.props.depenses - this.props.credits;
            this.setState({restant: calc})
        }
    }
  
    render() {

      return (
        <>
            <div className='form_section_restant'>
                <h4>
                  Restant pour le mois:
                </h4>
                <div>
                    <b>{this.state.restant}</b>
                </div>
            </div>
            <hr />
            <Objectifs salaires={this.props.salaires} depenses={this.props.depenses} credits={this.props.credits} restant={this.state.restant} />
        </>
      );
    }
}

export default Restant;