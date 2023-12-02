import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();



    const Forgotpassword = () => {
        const navigate = useNavigate();
        const notifyA = (msg) => toast.error(msg);
        const notifyB = (msg) => toast.success(msg);
        const [phrase, setPhrase] = useState("");

        const postData = async (e) => {
            e.preventDefault();
            
            if (!phrase) {
                return window.alert("Provide Phrase");
            }
        
            try {
                const response = await fetch("http://localhost:8000/forgotpassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phrase: phrase,
                    }),
                });
        
                const data = await response.json();
              
const id = data._id;
                if(response.status === 200) {
                    notifyB(data.message);
                    console.log(data);
                    navigate('/newPass',{state:{id}});
                } else {
                    notifyA(data.error || "Failed to submit phrase");
                }
            } catch (error) {
                console.error("An error occurred during the fetch:", error);
                notifyA("An error occurred while processing the request. Please try again later.");
            }
        };
        

        return (
            <div>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Typography component="h1" variant="h5">
                            Enter the phrase given to you at the time of registering with us
                        </Typography>
                        <Box component="form" sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phrase"
                                        label="Phrase"
                                        autoFocus
                                        onChange={(e) => { setPhrase(e.target.value) }}
                                        value={phrase}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={postData}
                                    >
                                        Submit Phrase
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        )
    }

    export default Forgotpassword