import React, { useState } from "react";
import Results from "./Results.jsx";

const Search = () => {
  const [query, setQuery] = useState({searchTerms: "", database: "mongo"});
  const [results, setResults] = useState([])
  const [running, setRunning] = useState(false)
  
    const handleSubmit = async (event) => {
        console.log(query)
        event.preventDefault();
        setRunning(true)
        const jsonQuery = JSON.stringify({searchTerms: query.searchTerms, database: query.database })
        await fetch("http://localhost:3500/movies", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: jsonQuery,
            })
        .then((response) => response.json())
        .then((response) => setResults(response), console.log(results))
    }


    return (
    <>
    <div className = "search">
        <form onSubmit={handleSubmit}>
        <label>
            Database:
            <select
            value={query.database}
            onChange={(e) => 
                setQuery({searchTerms: query.searchTerms, database: e.target.value})}
            >
                <option value="mongo">MongoDB</option>
                <option value="postgres">PostgreSQL</option>
            </select>
        </label>
        <label>
            Query:
            <input
            type="text"
            value={query.searchTerms}
            onChange={(e) => setQuery({searchTerms: e.target.value, database: query.database})}
            />
        </label>
        <input type="submit" value="Search" />
        </form>
    </div>
    {running ? <Results results={results} /> : null}
    </>
  );
};

export default Search