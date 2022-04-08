import React from 'react'
import { connect } from 'react-redux'
import Lottery from './Lottery'

const LotteryContainer = (props) => {
    return (
        <>
            <Lottery/>
        </>
    )
}

let mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {

})(LotteryContainer)