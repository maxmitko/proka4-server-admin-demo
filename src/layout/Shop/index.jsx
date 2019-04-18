import React from 'react'
import ProductTable from '../Product/ProductTable'
import ProductCategory from '../ProductCategory/ProductCategoryTable'
import ProductProperty from '../ProductProperty/ProductPropertyTable'
import ProductPropertyType from '../ProductPropertyType/PropertyTypeTable'
import styled from 'styled-components'

const ShopPage = props => {
    return (
        <Wrapper>
            <ProductTable />
            <AdditionalTables>
                <ProductCategory />
                <ProductPropertyType />
                <ProductPropertyStyled />
            </AdditionalTables>


        </Wrapper>
    )
}
export default ShopPage

const Wrapper = styled.div`
    margin: 0 -15px;

    > div {
        margin: 15px;
    }
`
const ProductPropertyStyled = styled(ProductProperty)`
        width: 670px;
`

const AdditionalTables = styled.div`
    display: flex;
    margin: 15px 0px !important;
    flex-wrap: wrap;

    > div {
        flex-grow: 1;
        margin: 0px 15px;
        align-self: flex-start;
    }
`