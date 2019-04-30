import Modal from 'components/Modal'
import Text from 'components/Text'
import T from 'prop-types'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import TextField from 'components/TextField'
import theme from 'theme/theme'

import ArrowSvg from '@material-ui/icons/ArrowDropDown'

import { ListStyled, MenuItem } from './styled'

const Select = props => {

    const { color, data, value, onChange } = props

    const [isOpen, setOpen] = useState(false)
    const [listBoundary, setListBoundary,] = useState({ top: null, left: null, width: null })
    const textFieldRef = useRef(null);
    const menuListRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const field = textFieldRef.current.getBoundingClientRect()
            const list = menuListRef.current.getBoundingClientRect()
            const screenHeight = window.innerHeight 
            
            let listYLip = screenHeight - field.bottom - list.height // выступ за экран по Y
            listYLip = listYLip < 0 ? Math.abs(listYLip) : 0

            setListBoundary({
                top: field.y + field.height - listYLip + 2,
                left: field.x,
                width: field.width
            })
        }
    }, [isOpen]);

    const selectItemHandler = e => {
        setOpen(false)
        onChange(e)
    }

    const customValue =
        (value !== undefined && value !== null)
        && data.length
        && data.filter(item => String(item.value) === String(value))[0].label

    return (
        <>
            <TextField
                {...props}
                value={customValue || ''}
                onFocus={() => setOpen(true)}
                arrow={<ArrowSvg />}
                ref={textFieldRef}
            />
            <Modal
                isOpen={isOpen}
                onClose={useCallback(() => setOpen(false), [])}
                top={!!listBoundary.top ? listBoundary.top + "px" : null}
                left={!!listBoundary.left ? listBoundary.left + "px" : null}
            >
                <ListStyled width={listBoundary.width} ref={menuListRef}>
                    {data.map(item =>
                        <MenuItem
                            key={item.value}
                            onClick={selectItemHandler}
                            color={color}
                            data-value={item.value}
                            selected={value === item.value}
                        >
                            {item.label}
                        </MenuItem>
                    )}
                    <Text variant="caption">{data.length === 0 && "Элементы отсутствуют"}</Text>
                </ListStyled>
            </Modal>
        </>
    )
}

Select.defaultProps = {
    data: [],
    color: 'default',
    value: undefined,
    onChange: () => {},
};

Select.propTypes = {
    data: T.arrayOf(T.shape({
        value: T.any,
        label: T.string
    })),
    color: T.oneOf(Object.keys(theme.extra)),
};

export default Select