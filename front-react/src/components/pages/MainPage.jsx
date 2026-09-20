import Pomodoro from '../Pomodoro'
import Tasks from '../Tasks'
import UserData from '../UserData'

function MainPage() {
    return (
        <div style={{display: 'flex', flexDirection:'column', gap: '5px'}}>
            <UserData />    
            <Pomodoro />            
            <Tasks />
        </div>
    )
}

export default MainPage