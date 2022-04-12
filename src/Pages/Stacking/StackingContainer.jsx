import React, { useState } from 'react'
import Stacking from './Staking'

const StackingContainer = (props) => {
    const [toogleValue, setToogleValue] = useState("stake")
    const [currentPercent, setCurrentPercent] = useState(50)
    const [stakeValue, setStakeValue] = useState("")
    const [unstakeValue, setUnstakeValue] = useState("")

    const info = [
        {
            period: "30 Days",
            daily_back: "2%",
            earnings: "400 K $ACES",
            amount_staked: "132,568,333",
            rewards: "132.3142 $ACES",
            liquidity: "$ 56 M",
        },
        {
            period: "60 Days",
            daily_back: "3%",
            earnings: 0,
            amount_staked: "132,568,333",
            rewards: "132.3142 $ACES",
            liquidity: "$ 56 M",
        },
        {
            period: "90 Days",
            daily_back: "5%",
            amount_staked: "132,568,333",
            rewards: "132.3142 $ACES",
            liquidity: "$ 56 M",
        },
    ]

    const [currentInfo, setCurrentInfo] = useState(info[0])

    return (
        <>
            <Stacking
                toogleValue={toogleValue}
                setToogleValue={setToogleValue}
                info={info}
                currentInfo={currentInfo}
                setCurrentInfo={setCurrentInfo}
                currentPercent={currentPercent}
                setCurrentPercent={setCurrentPercent}
                stakeValue={stakeValue}
                handleStakeValue={setStakeValue}
                unstakeValue={unstakeValue}
                handleUnstakeValue={setUnstakeValue}
            />
        </>
    )
}

export default StackingContainer