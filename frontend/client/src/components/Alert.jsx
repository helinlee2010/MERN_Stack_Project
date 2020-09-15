import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'


export default function Alert(props) {
    // severity can be: 'error' or 'success' or 'warning'
    const { msg, severity } = props
    const [open, setOpen] = useState(true);
    const handleClose= (event, reason) => {
        if(reason==='clickaway'){
            return;
        }
        setOpen(false);
    }
    // function duration(){
    //     if(severity==='error'){ return 1500}
    //     else{ return 5000}
    //     //当错误显示后 第二次尝试将不会出现error提示 跟open的state有关
    // }
    
    //若设定autoHideDuration为固定数值，当错误出现后再次尝试为success时，error的提示依然在顶部
    // 遮掉了success的提示

    return (
        <div>
            <Snackbar open={open} anchorOrigin={{horizontal:'center', vertical:'top'}} onClose={handleClose} autoHideDuration={3000}>
                <MuiAlert elevation={3} variant='filled' onClose={handleClose} severity={severity}>
                {msg}</MuiAlert>
            </Snackbar>
        </div>
    )
}
