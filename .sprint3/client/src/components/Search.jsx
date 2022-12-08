import React, { useState } from "react";
import Results from "./Results.jsx";

const Search = () => {
  const [query, setQuery] = useState({searchTerms: "", database: "mongo"});
  const [movies, setMovies] = useState([])
  
    const handleSubmit = async (event) => {
        console.log(query)
        event.preventDefault();
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
        .then((response)=>console.log(response))
    }


    return (
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
  );
};

export default Search