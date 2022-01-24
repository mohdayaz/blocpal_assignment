import React, { useState } from "react"

const SelectGenre = (props) => {
    const [selectedId, setSelectedId] = useState(0);

    const handleGenre = (id, index, name) => {
        setSelectedId(index)
        props.handlePlaylist(id, name)
    }

    return <div className="container genre_container">
        <p className="title">Select Genre</p>
        {props.data.map((e,i) => <div className={"card"+ (selectedId === i ? " active" : "")} onClick={() => handleGenre(e.id, i, e.name)}>
            <img src={e.icons[0].url || ""}/>
            <p>{e.name}</p>
        </div>)}
    </div>
}

export default SelectGenre