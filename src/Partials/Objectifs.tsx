import * as React from 'react';
import './css/Objectifs.css'
import './css/Tooltip.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 

interface IMyComponentProps {
    props: object,
    depenses: number,
    credits: number,
    salaires: number,
    restant: number
}

interface IMyComponentState {
    objectifs: ObjectifsDatas
    restant_objectif: number
}

interface ObjectifsDatas {
    montant_depenses_fixes_objectif: number,
    unite_depenses_fixes_objectif: string
    montant_depenses_variables_objectif: number,
    unite_depenses_variables_objectif: string
    montant_epargne_objectif: number,
    unite_epargne_objectif: string
    montant_loisirs_objectif: number,
    unite_loisirs_objectif: string
}

class Objectifs extends React.Component<IMyComponentProps, IMyComponentState> {
    static defaultProps = {props:{}}
    constructor(props: any) {
      super(props);
      this.state = {
          objectifs: {
            montant_depenses_fixes_objectif: 0, 
            unite_depenses_fixes_objectif: '',
            montant_depenses_variables_objectif: 0, 
            unite_depenses_variables_objectif: '',
            montant_epargne_objectif: 0, 
            unite_epargne_objectif: '',
            montant_loisirs_objectif: 0, 
            unite_loisirs_objectif: ''
            },
            restant_objectif: 0
        };
    }

    componentDidUpdate(previousProps:any, previousState:any) {
        if ((previousProps.salaires !== this.props.salaires) || (previousState.objectifs !== this.state.objectifs)) {
            this.calculateRestantObjectif()
        }
    }

    componentDidMount() {
         if (localStorage.getItem('objectifs')) {
            this.calculateRestantObjectif()
            this.setState({objectifs: JSON.parse(localStorage.getItem('objectifs'))});
        }
    }

    handleChange(event: { target: { value: string; }; }, input: keyof ObjectifsDatas) {
        const value = event.target.value;
        let objectifs: any = this.state.objectifs;
  
        objectifs[input] = input.includes('unite') ? value : parseInt(value)
  
        this.setState({objectifs: objectifs});
        localStorage.setItem('objectifs', JSON.stringify(objectifs));
        this.calculateRestantObjectif()
      }

      calculateRestantObjectif() {
        if (localStorage.getItem('objectifs')) {
            let objectifs: ObjectifsDatas = JSON.parse(localStorage.getItem('objectifs'))
            let depenses_fixes = objectifs.montant_depenses_fixes_objectif
            let depenses_variables = objectifs.montant_depenses_variables_objectif
            let epargne = objectifs.montant_epargne_objectif
            let loisirs = objectifs.montant_loisirs_objectif

            let calc = this.props.salaires - depenses_fixes - depenses_variables - epargne - loisirs;
            this.setState({restant_objectif: calc})
        }
      }
  
    render() {
      return (
        <>
            <div className='form_section'>
                <div className="form_section-label">
                    <h4>
                  Objectifs
                    </h4>
                </div>
                
                <div className='form_section-inputs'>
                    <div className='form_section_objectif-input'>
                        <p><b>Dépenses fixes</b>                    
                            <i className='fa fa-question-circle tooltip'>
                               <span className='tooltiptext'>Logement, électricité, abonnements multimédia, transports, impôts, assurances</span>
                            </i>
                        </p>
                      <input type="number" name="montant_depenses_fixes_objectif" onChange={e => this.handleChange(e, 'montant_depenses_fixes_objectif')} value={this.state.objectifs.montant_depenses_fixes_objectif}/>
                      <select name="unite_depenses_fixes_objectif" onChange={e => this.handleChange(e, 'unite_depenses_fixes_objectif')} value={this.state.objectifs.unite_depenses_fixes_objectif}>
                            <option style={{backgroundColor: 'grey'}} value="">Unité</option>
                            <option value="percent">%</option>
                            <option value="euro">Eur</option>
                      </select>
                      <i className='fa fa-info-circle tooltip'>
                            <span className='tooltiptext'></span>
                      </i>
                    </div>
                    <div className='form_section_objectif-input'>
                      <p><b>Dépenses variables</b>
                        <i className='fa fa-question-circle tooltip'>
                             <span className='tooltiptext'>Vêtements, santé, nourriture, cadeaux</span>
                        </i>
                      </p>
                      <input type="number" name="montant_depenses_variables_objectif" onChange={e => this.handleChange(e, 'montant_depenses_variables_objectif')} value={this.state.objectifs.montant_depenses_variables_objectif}/>
                      <select name="unite_depenses_variables_objectif" onChange={e => this.handleChange(e, 'unite_depenses_variables_objectif')} value={this.state.objectifs.unite_depenses_variables_objectif}>
                            <option style={{backgroundColor: 'grey'}} value="">Unité</option>
                            <option value="percent">%</option>
                            <option value="euro">Eur</option>
                      </select>
                      <i className='fa fa-info-circle tooltip'>
                            <span className='tooltiptext'></span>
                      </i>
                    </div>
                    <div className='form_section_objectif-input'>
                      <p><b>Epargne</b></p>
                      <input type="number" name="montant_epargne_objectif" onChange={e => this.handleChange(e, 'montant_epargne_objectif')} value={this.state.objectifs.montant_epargne_objectif}/>
                      <select name="unite_epargne_objectif" onChange={e => this.handleChange(e, 'unite_epargne_objectif')} value={this.state.objectifs.unite_epargne_objectif}>
                            <option style={{backgroundColor: 'grey'}} value="">Unité</option>
                            <option value="percent">%</option>
                            <option value="euro">Eur</option>
                      </select>
                      <i className='fa fa-info-circle tooltip'>
                            <span className='tooltiptext'></span>
                      </i>
                    </div>
                    <div className='form_section_objectif-input'>
                      <p><b>Loisirs et coups de cœur</b>
                        <i className='fa fa-question-circle tooltip'>
                            <span className='tooltiptext'>Vacances, sorties, razzia chez Apple ou dans les grands magasins</span>
                        </i>
                      </p>
                      <input type="number" name="montant_loisirs_objectif" onChange={e => this.handleChange(e, 'montant_loisirs_objectif')} value={this.state.objectifs.montant_loisirs_objectif}/>
                      <select name="unite_loisirs_objectif" onChange={e => this.handleChange(e, 'unite_loisirs_objectif')} value={this.state.objectifs.unite_loisirs_objectif}>
                            <option style={{backgroundColor: 'grey'}} value="">Unité</option>
                            <option value="percent">%</option>
                            <option value="euro">Eur</option>
                      </select>
                      <i className='fa fa-info-circle tooltip'>
                            <span className='tooltiptext'></span>
                      </i>
                    </div>
                </div>
            </div>
            <hr />
            <div className='form_section_restant'>
                <h4>
                  Restant sur objectif:
                </h4>
                <div className={`${this.state.restant_objectif < 0  ? "budget_out" : ""}`}>
                    <b>{this.state.restant_objectif}</b>
                </div>
            </div>
            <hr />
            <div className="form_section-label">
                    <h4>
                  {/* Projets */}
                    </h4>
            </div>
        </>
      );
    }
}

export default Objectifs;