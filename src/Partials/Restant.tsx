import React from 'react';

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
        <div className='form_section'>
            <h4>
              Restant:
            </h4>
            <div>
                {this.state.restant}
            </div>
        </div>
        </>
      );
    }
}

export default Restant;