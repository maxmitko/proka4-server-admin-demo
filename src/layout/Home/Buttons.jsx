import React from 'react'
import Button from 'components/Button'
import CornerBadge from 'components/Badge/Corner'


const Buttons = props => {

    return (
        <div style={{ margin: "20px" }}>
            {['default', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose'].map(item => <Button key={item} color={item}>{item}</Button>)}<br />
            {['text', 'outlined', 'contained'].map(item => <Button key={item} color="default" variant={item}>{item}</Button>)}<br />
            {['text', 'outlined', 'contained'].map(item => <Button key={item} color="white" variant={item}>{item}</Button>)}<br />
            {['text', 'outlined', 'contained'].map(item => <Button key={item} color="primary" variant={item}>{item}</Button>)} <br />
            {['small', 'medium', 'large'].map(item => <Button key={item} size={item}>{item}</Button>)}<br />
            {['text', 'outlined', 'contained'].map(item => <Button key={item} color="primary" disabled variant={item}>{item}</Button>)}<br />
            {['text', 'outlined', 'contained'].map(item => <Button key={item} color="primary" active variant={item}>{item}<CornerBadge key={item} badgeContent={4} /></Button>)}
        </div>
    )
}

export default Buttons