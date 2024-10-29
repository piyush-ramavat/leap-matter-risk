import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

type Props = {
  handleGo: (prompt: string) => {};
  isLoading: boolean;
};

export function AskAI({ handleGo, isLoading }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  return (
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
        onClick={() => handleGo(prompt)}
        disabled={isLoading}
      >
        Go
      </Button>
    </Box>
  );
}
