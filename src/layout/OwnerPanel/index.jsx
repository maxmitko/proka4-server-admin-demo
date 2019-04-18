import React, { useCallback, useEffect } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/ownerPanel'
import styled from 'styled-components'
import AvaImg from 'assets/images/face-female.png'
import Fade from 'components/Transition/ShiftFadeOut'
import ListItemText from 'components/List/ListItemText';

const UserWidget = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.ownerPanel }), [])
    const fetchOne = useCallback(() => dispatch(actionCreator.fetchList()), []);

    const { data, loading } = useMappedState(mapState);
    const { transitionTrigger } = props;

    useEffect(() => {
        if (!data.length) fetchOne()
    }, [])

    const name = loading ? "загрузка..." : data.fullname

    return (
        <Wrapper>
            <Avatar src={AvaImg} />
            <Fade in={transitionTrigger}>
                <ListItemText primary={name} />
            </Fade>
        </Wrapper>
    )
}

export default UserWidget

const Wrapper = styled.div`
    margin: 30px 15px 10px 15px;
    color: white;
    position: relative;
    display: flex;
    align-items: center;
    padding: 12px 0;

    ::after {
        width: 100%;
        bottom: 0;
        height: 1px;
        content: "";
        position: absolute;
        background-color: hsla(0,0%,100%,.3);
    }
`
const Avatar = styled.img`
        width: 30px;
        margin-left: 12px;
`