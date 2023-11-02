import {useState} from 'react';
import state from '../state'

const style = {
    zIndex: 1,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '10vh',
    height: '40px',
    width: '40px',
    backgroundColor: 'rgb(30, 75, 93)',
    color: 'black',
    borderRadius: '50%',
    fontSize: 20,
    fontWeight: 'bold',
    border: '1px solid black',
    cursor: 'pointer'
}

const CameraButtons = ({}) => {

    const sets = {
        // "mesh004_paint_0" SUV
        1: {
            cameraPos: [7,3,2],
            target: [4,0,0],
            name: 'mesh004_paint_0'
        },
        2: {
            cameraPos: [-1,3,2],
            target: [-4,0,0]
           
        }
    }

    const handleClick = num => {
        state.cameraPos.set(...sets[num].cameraPos)
        state.target.set(...sets[num].target)
        state.activeMeshName = sets[num].name
        state.shouldUpdate = true

    }

    return (
        <>
        <button 
            onClick={e => handleClick(1)}
            style={{
                right: '40vw',
                ...style
            }}>
        {'>'}
        </button>
        <button
            onClick={e => handleClick(2)}
            style={{
                left: '40vw',
                ...style
             }}>
        {'<'}
        </button>
        </>
    )
}

export default CameraButtons;