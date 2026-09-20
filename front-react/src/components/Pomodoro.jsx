import { useEffect, useState } from 'react'

const WORK_TIME = 25 * 60;

const colors = [
    {r: 0,   g: 128, b: 0},
    {r: 255, g: 255, b: 0},
    {r: 255, g: 165, b: 0},
    {r: 255, g: 0,   b: 0},
];

function Pomodoro() {
    const [currentTime, setCurTime] = useState(WORK_TIME);
    const [currentColor, setColor] = useState(colors[0]);
    const [inWork, setInWork] = useState(false);

    function gradient(){

        const intervals = colors.length - 1;
        const period = Math.floor(WORK_TIME / intervals);
        const periodNumber = Math.floor((WORK_TIME - currentTime) / period);
        const timePeriod = period - currentTime % period;
        const periodProgress = timePeriod / period % 1;                    

        if((periodNumber + 1) >= colors.length) return;

        const newR = colors[periodNumber].r + (colors[periodNumber + 1].r - colors[periodNumber].r) * periodProgress;
        const newG = colors[periodNumber].g + (colors[periodNumber + 1].g - colors[periodNumber].g) * periodProgress;
        const newB = colors[periodNumber].b + (colors[periodNumber + 1].b - colors[periodNumber].b) * periodProgress;

        setColor({r: newR, g: newG, b: newB});
    }

    useEffect(
        () => {
            let interval = null;

            if(inWork && currentTime >= 0) {
                interval = setInterval(()=> {
                    setCurTime((curTime) => curTime - 1);
                    gradient();
                }, 10);// 1000
            } else if ( currentTime <= 0 ) {
                clearInterval(interval);
                alert('Время вышло, сделайте перерыв!');
                setCurTime(WORK_TIME);
                setColor(colors[0]);
                setInWork(false);
            }
            return ()=>clearInterval(interval)
        },[inWork, currentTime]
    )

    return (
        <div style={styles.container}>
            <h3>Помидорка</h3>
            <div style={{...styles.timer, color:`rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`}}>
                { Math.floor(currentTime / 60).toString().padStart(2, '0') }: 
                { (currentTime % 60).toString().padStart(2, '0') }
            </div> 
            <div style={styles.buttons}> 
                <button onClick={()=>setInWork(!inWork)} disabled={currentTime === 0} style={styles.button} > 
                    {inWork ? 'Стоп' : 'Старт'} 
                </button> 
                <button onClick={()=> {
                    setCurTime(WORK_TIME);
                    setColor(colors[0]);
                    setInWork(false); }} style={styles.button}
                > Сброс </button>
            </div>
        </div>
    )
}

const styles = { 
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '20vh', 
        fontFamily: 'Arial, sans-serif', 
        backgroundColor: '#f4f4f9', 
    },
    timer: { 
        fontSize: '3rem', 
        color: '#333', 
    }, 
    buttons: { 
        marginTop: '20px', 
        display: 'flex', 
        gap: '15px', 
    }, 
    button: { 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        borderRadius: '6px', 
        border: 'none', 
        backgroundColor: '#007bff', 
        color: 'white', 
        transition: 'background-color 0.2s', 
    }, 
};

export default Pomodoro