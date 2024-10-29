import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useQueryAI } from "../services";

function Main() {
  const [prompt, setPrompt] = useState<string>("");
  const mutation = useQueryAI();
  const handleGo = async () => {
    try {
      const result = await mutation.mutateAsync({ text: prompt });
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />
        <Typography variant="h5">Welcome to LEAP Matter Risk app.</Typography>
        <Box sx={{ mt: 5, width: "100%" }}>
          <TextField
            required
            fullWidth
            id="prompt"
            label="Ask Ai"
            name="prompt"
            value={prompt}
            variant="outlined"
            multiline
            rows={5}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGo}
          >
            Go
          </Button>
        </Box>
      </Container>
    </>
  );
}
export default Main;
