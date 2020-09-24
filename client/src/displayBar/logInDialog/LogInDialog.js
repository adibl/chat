import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(true);
    const username = useRef("");
    let handleClose = () => {
        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: username.current.value})
        }).then((res) => {
                if (res.status === 200) {
                    props.login(username.current.value)
                    setOpen(false);
                }
                else if (res.status === 409) {
                    props.login(username.current.value)
                    setOpen(false);
                }
                else {
                    alert(res.status);
                }
            });

    };

    return (
            <Dialog open={open}>
                <DialogTitle id="form-dialog-title">login with username</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        required={true}
                        type="string"
                        fullWidth
                        inputRef={username}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        LogIn
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
