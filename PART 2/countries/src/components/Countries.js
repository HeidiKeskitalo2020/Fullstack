import React from 'react'
import SingleCountry from './SingleCountry'

const Countries = ({ countries, filter, onClickHandler }) => {
    const filteredC = countries
    .filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase()))

        if(filteredC.length > 10) {
            return 'Too many matches, specify anoteher filter'
        }
        else if(filteredC.length === 1) {
            return <SingleCountry country= {filteredC[0]} />
        }
        else
        {
            return (
               <div>
                    {filteredC.map(c => <li key={c.alpha2Code}>{c.name}
                    </li>
                    )}
                </div>
            )
        }
    }    

export default Countries