import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                payonweb
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const passRege = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const postData = async (event) => {
        event.preventDefault();

        if (!passRege.test(password)) {
            notifyA("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?!");
            return;
        }

        try {
            fetch("http://localhost:8000/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error);
                    } else {
                        notifyB(data.message);
                        navigate('/payment');
                    }
                    console.log(data)
                })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={(e) => { setUserName(e.target.value) }}
                            value={username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={postData}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <NavLink to="/forgotpassword" variant="body2">
                                    Forgot password?
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}