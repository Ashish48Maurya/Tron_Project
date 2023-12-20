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
import { generate } from "random-words";
import { useAuth } from '../store/auth';
import Navbar from './Navbar';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                payonweb
            </Link>{' '}
            <NavLink color="inherit" to="https://mui.com/">
                Your Website
            </NavLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [phrase, setPhrase] = useState("");


    const {storeTokenInLS} = useAuth();

    //Toast functions
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const passRege = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    const postData = async (event) => {
        event.preventDefault();
        if (!username || !password || !phrase) {
            return notifyA("All Fields Are Required!!!");
        }

        else if (!passRege.test(password)) {
            notifyA("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body:

                    JSON.stringify({
                        username: username,
                        password: password,
                        phrase: phrase,
                    }),
            });

            if (response.status === 200) {
                const res_data = await response.json();
                console.log("response from server ", res_data);
                storeTokenInLS(res_data.token);
                notifyB("Registration Successfull !!!");
                navigate("/");
            } else {
                return notifyA("Username Already Exist!!!");
            }
        }
        catch (error) {
            notifyA(error);
        }
    }

    const setUsername = async () => {
        const response = await fetch("http://localhost:8000/username", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setUserName(data.username);
        } else {
            window.alert("Server Busy, Try Again Later");
        }
    }

    const setPrase = async () => {
        const phrase = generate({ exactly: 8, join: " ", maxLength: 6 });
        setPhrase(phrase);
    }



    return (
        <>
        <Navbar/>
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={postData} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Username"
                                    autoFocus
                                    onChange={(e) => { setUserName(e.target.value) }}
                                    value={username}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={setUsername}
                                >
                                    Generate Username
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phrase"
                                    label="Phrase"
                                    name="phrase"
                                    type='text'
                                    contentEditable="false"
                                    value={phrase}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={setPrase}
                                >
                                    Generate Phrase
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    value={password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/" variant="body2">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider >
        </>
    );
}