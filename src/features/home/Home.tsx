import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./components/PrimaryAppBar";
import PrimaryDraw from "./components/PrimaryDraw";
import SecondaryDraw from "./components/SecondaryDraw";
import Main from "./components/Main";
import PopularChannels from "./components/PopularChannels";
import ExploreCategories from "./components/ExploreCategories";
import ExploreServer from "./components/ExploreServer";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <PopularChannels />
      </PrimaryDraw>

      <SecondaryDraw>
        <ExploreCategories />
      </SecondaryDraw>
      <Main>
        <ExploreServer />
      </Main>
    </Box>
  );
};

export default Home;
