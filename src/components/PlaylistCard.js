import { useDrag } from 'react-dnd';

const PlaylistCard = (props) =>  {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "box",
        item: {name: props.xyz},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                props.handleMyList(item.name)
                //console.log("trigger", item)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    //const opacity = isDragging ? 0.4 : 1;

    return (<div ref={drag} className='card' role="box" data-testid={`box-${props.xyz}`}>
		<div className='left'>
            <p className='s_no'>{props.key_name}</p>
            <img src={props.data.images[0].url} alt="playlist"/>
            <p className='name'>{props.data.name}</p>
        </div>
        <p className='description'>{props.data.description.substring(0, 36)+ (props.data.description.length > 36 ? "..." : "")}</p>
	</div>);
};

export default PlaylistCard
