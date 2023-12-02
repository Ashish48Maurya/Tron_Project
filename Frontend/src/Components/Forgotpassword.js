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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Forgotpassword = () => {
    const navigate = useNavigate();

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const postData = async () => {

        try {
            fetch("http://localhost:8000/forgotpassword", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phrase:phrase,
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error);
                    } else {
                        notifyB(data.message);
                        navigate('/admin');
                    }
                    console.log(data)
                })
        } catch (error) {
            console.log(error);
        }
    }

    const [phrase, setPhrase] = useState("");
  return (
      <div>
          <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Typography component="h1" variant="h5">
                      Enter the phrase given to you at the time of registering with us
                  </Typography>
                  <Box component="form"  sx={{ mt: 1 }}>  
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