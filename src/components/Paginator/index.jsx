import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Button from 'components/Button/index'

class Paginator extends React.PureComponent {

  state = {
    currentPage: this.props.defaultPage,
  }

  pageChangeHandler = pageIndex => e => {
    const callback = this.props.onPageChanged(pageIndex)
    this.setState({ currentPage: pageIndex }, callback)
  }

  getTotalPages = () => {
    const result = Math.ceil(this.props.totalRecords / this.props.pageLimit)

    if (this.props.totalRecords === this.props.pageLimit) return 0
    if (result === 1) return 0
    return result
  }

  getRange = () => {
    const { pageNeighbours, } = this.props
    let { currentPage } = this.state

    let totalPages = this.getTotalPages()
    if (totalPages === 0) return []

    const overflowBox = pageNeighbours * 2 + 2 >= totalPages
    if (overflowBox) return Array.from(new Array(totalPages), (item, i) => i)

    totalPages--
    const rightBoxBoard = currentPage + pageNeighbours
    const BoxLeftCrossed = currentPage <= pageNeighbours
    const BoxRightCrossed = rightBoxBoard >= totalPages

    let prevStack = BoxLeftCrossed ? currentPage : pageNeighbours
    if (BoxRightCrossed) prevStack += rightBoxBoard - totalPages
    let nextStack = pageNeighbours * 2 - prevStack

    if (!BoxLeftCrossed) {
      prevStack--
      nextStack--
    }

    if (BoxRightCrossed) {
      prevStack++
      nextStack++
    }

    const range = [currentPage]
    for (let i = 1; i <= prevStack; i++) {
      range.unshift(currentPage - i)
    }

    for (let i = 1; i <= nextStack; i++) {
      range.push(currentPage + i)
    }

    if (!BoxLeftCrossed) {
      range.unshift('prev')
      range.unshift('first')
    }

    if (!BoxRightCrossed) {
      range.push('next')
      range.push('last')
    }

    return range
  }

  pagePrevNextHandler = command => e => {

    const callback = this.pageChangeHandler(this.state.currentPage)()
    if (command === 'prev') this.setState(state => ({ currentPage: --state.currentPage }), callback)
    if (command === 'next') this.setState(state => ({ currentPage: ++state.currentPage }), callback)
  }



  render() {

    const totalPages = this.getTotalPages()
    const { currentPage } = this.state

    if (!this.props.totalRecords || !this.props.pageLimit) return <div></div>

    let range = this.getRange() || []

    const renderButton = index => {
      switch (index) {
        case 'prev':
          return <ButtonStyled key={'prev'} onClick={this.pagePrevNextHandler('prev')}>{'<'}</ButtonStyled>
        case 'next':
          return <ButtonStyled key={'next'} onClick={this.pagePrevNextHandler('next')}>{'>'}</ButtonStyled>
        case 'first':
          return <ButtonStyled key={'first'} onClick={this.pageChangeHandler(0)}>{1}</ButtonStyled>
        case 'last':
          return <ButtonStyled key={'last'} onClick={this.pageChangeHandler(totalPages - 1)}>{totalPages}</ButtonStyled>
        default:
          return <ButtonStyled
            key={index}
            active={currentPage === index}
            onClick={this.pageChangeHandler(index)}>
            {index + 1}
          </ButtonStyled>
      }
    }

    return (
      <Wrapper>
        {range.map(pageIndex => renderButton(pageIndex))}
      </Wrapper>
    )
  }
}

Paginator.defaultProps = {
  pageNeighbours: 3,
};

Paginator.propTypes = {
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Paginator;

const ButtonStyled = styled(Button)`
  padding: 10px 15px;
  margin: 3px;
  display: ${props => props.invisible ? "none" : "block"};
  box-sizing: border-box;
`

const Wrapper = styled.div`
  display: flex;
`