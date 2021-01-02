import React from 'react'

import './Items.css';

const Items = (props) => {
    return (
        <div>
            <h5>
               { props.items.length === 0  ? '- brak obrazów -' : 'Lista obrazów' }
            </h5>
            { props.items.length !== 0 && 
                <table className="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nazwa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map( (item, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i+1}</th>
                                    <td>{item.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Items
