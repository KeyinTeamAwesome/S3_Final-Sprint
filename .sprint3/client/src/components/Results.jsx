import React from 'react'

const Results = (props) => {
  return (
    <div className = "result-wrapper">
        {props.results.map((result) => (
            <div key={result.id} className="result">
                <h3>{result.title}</h3>
                <p>{result.genre}</p>
                <p>{result.year}</p>
            </div>))}
    </div>
  )
}

export default Results