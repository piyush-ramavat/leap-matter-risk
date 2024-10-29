import {
  Container,
  CssBaseline,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useQueryAI } from "../services";
import { PromptResponse } from "../lib/types";
import { AskAI, ResultList } from "../components";

function Main() {
  const [response, setResponse] = useState<PromptResponse>();
  const queryAi = useQueryAI();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleGo = async (prompt: string) => {
    try {
      setIsFetching(true);
      const response = await queryAi.mutateAsync({ text: prompt });
      setResponse(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />
        <Typography variant="h5">Welcome to LEAP Matter Risk app ! </Typography>
        <Typography>
          Ask any question and our friendly Ai bot will help find answer for
          you.{" "}
        </Typography>
        <AskAI handleGo={handleGo} isLoading={isFetching} />
        <Box sx={{ mt: 5, width: "100%" }}>
          {isFetching && <CircularProgress />}
          {!isFetching && response && (
            <>
              <Typography variant="subtitle1">
                Here are some results for your questions:
              </Typography>
              <Typography variant="subtitle2">
                From the list, you can edit the rows by clicking on it and
                delete unwanted results and download the CSV .
              </Typography>
              <ResultList response={response} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}
export default Main;
