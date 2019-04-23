import React, {useState, useEffect} from 'react'
import Checkbox from 'components/Checkbox'

const Actions = props => {
    const { isActive, toggleActiveHandler } = props
    
    const [active, setActive] = useState(!!isActive)

    useEffect(() => {
        setActive(isActive)
    }, [isActive])

    
    const toggleActive = () =>  {
        setActive(state => !state)
        toggleActiveHandler(!!active)
    }

    return (
        <label>
            <Checkbox
                checked={!!active}
                onChange={toggleActive}
                variant="toggle"
            />
        </label>
    )
}

export default Actions