import Paper from 'components/Paper'
import Text from 'components/Text'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator as ordersBookActions } from 'store/reducers/ordersBook'
import styled from 'styled-components';

import { HeaderBadgeStyled } from '../Form/index'
import Table from '../GridView/Table'

const TicketForm = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.ordersBook }), [])
    const fetchOrdersBook = useCallback(options => dispatch(ordersBookActions.fetchList(options)), []);

    const { loading, data } = useMappedState(mapState);
    const { initialData } = props;

    useEffect(() => {
        fetchOrdersBook({
            relations: [
                "order",
                "order.user",
                "product",
                "product.categories",
                "product.properties"
            ],
            where: {
                order: {
                    id: initialData.id
                }
            }
        })
    }, [])

    const columns = useCallback([
        {
            title: 'Наименовнание',
            render: row => row.product.title,
        },
        {
            title: 'Количество',
            render: row => row.count,
            style: { textAlign: 'center' },
        },
        {
            title: 'Свойства',
            render: row => row.product.properties.map(item => item.description).join(", ") || 'не указано',
            style: { textAlign: 'center' },
        },
        {
            title: 'Стоимость единицы',
            render: row => row.product.price,
            style: { textAlign: 'center' },
        },
        {
            title: 'Общая стоимость',
            render: row => row.product.price * row.count,
            style: { textAlign: 'center' },
        },

    ], [data])

    return (
        <Wrapper>
            <HeaderBadgeStyled><Text variant="h6" color="primary" >{`ID заказа ${initialData.id}`}</Text></HeaderBadgeStyled>
            <TableWrapper>
                <Table
                    data={data}
                    columns={columns}
                    loading={loading}
                />
                {!!data.length && <Text align="right">{"Итого: " + data.reduce((acc, item) => acc + (item.count * item.product.price), 0)}</Text>}
            </TableWrapper>
        </Wrapper>
    )
}

export default TicketForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 550px;
`
const TableWrapper = styled.div`
    height: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
`