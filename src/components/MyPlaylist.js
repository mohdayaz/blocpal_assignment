import { useDrop } from 'react-dnd';

const MyPlaylist = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "box",
        drop: () => ({ name: 'MyPlay_list' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return <div ref={drop} role={'My_Playlist'} className='my_playlist_container'>
        <p className='title'>Your Playlist Liberary</p>
        {props.data.length > 0 ? (props.data.map(e => <div className='card'>
            <div className='left'>
                <img src={e.images[0].url}/>
                <p className='name'>{e.name}</p>
            </div>
            <button className='delete' onClick={() => props.deletePlaylist(e.id)}>Delete</button>
        </div>)): 
            <div className='no_data'>
                No Playlist Yet!
                <br/><span>Drag a playlist from suggested playlist and drop here to create your own playlist liberary</span>
            </div>
        }
    </div>;
};


export default MyPlaylist