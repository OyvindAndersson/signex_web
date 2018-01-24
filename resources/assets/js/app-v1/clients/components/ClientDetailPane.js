import React from 'react'

/**-------------------------------------------------
 * Client Details Pane
 * -------------------------------------------------
 * 
 */
export default class ClientDetailPane extends React.Component {
    render() {
        const {client} = this.props

        const orgnrItem = (
            <li className="list-group-item">
                <small>Organization nr: </small>
                <a target="_blank" href={`https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=${client.org_nr}`}>
                    {_.replace(client.org_nr, /(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}
                </a>
            </li>
        )

        return(
            <div className="row align-items-center">
                <div className="col">
                    <h2 className="text-primary">{client.name} 
                        <small className="text-dark"></small>
                    </h2>
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <p></p>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-group">
                                {client.org_nr ? orgnrItem : null}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}