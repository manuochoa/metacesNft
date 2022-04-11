import { Typography } from '@mui/material'
import React from 'react'
import CurrentJackpot from '../../Components/Common/CurrentJackpot/CurrentJackpot'
import TabTable from '../../Components/Common/TabTable/TabTable'
import LeftSide from '../../Components/UI/Sides/LeftSide/LeftSide'
import RightSide from '../../Components/UI/Sides/RightSide/RightSide'
import classes from './NftLottery.module.css'

import nft1 from '../../Assets/nft1.jpg'
import nft2 from '../../Assets/nft2.jpg'
import nft3 from '../../Assets/nft3.jpg'
import nft4 from '../../Assets/nft4.jpg'
import NftSmallItem from '../../Components/NFT/NftSmallItem/NftSmallItem'

const NftLottery = (props) => {
    const values = [
        {
            _id: "qwe",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 1
        },
        {
            _id: "qwe1",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe2",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe3",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe4",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe5",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe6",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe7",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe8",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe9",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 3
        },
        {
            _id: "qwe10",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 77
        },
        {
            _id: "qwe11",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe12",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe13",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },

        {
            _id: "qwe14",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe15",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe16",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe17",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe18",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe19",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
    ]

    const nfts = [
        { image: nft1 },
        { image: nft2 },
        { image: nft3 },
        { image: nft4 },
        { image: nft1 },
        { image: nft2 },
        { image: nft3 },
        { image: nft4 },
    ]

    return (
        <div className={classes.main}>
            <LeftSide className={classes.left}>
                <CurrentJackpot cash={"38,881.34"} actionText={"Mint Now"}/>
                <TabTable items={values}/>
            </LeftSide>
            <RightSide className={classes.right}>
                <Typography variant='h4' color="primary">Eligible NFT's</Typography>
                <div className={classes.wrapper}>
                    {nfts.map(el => (
                        <NftSmallItem item={el}/>
                    ))}
                </div>
            </RightSide>
        </div>
    )
}

export default NftLottery