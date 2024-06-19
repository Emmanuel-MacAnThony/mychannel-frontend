import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "../home/components/PrimaryAppBar";
import PrimaryDraw from "../home/components/PrimaryDraw";
import SecondaryDraw from "../home/components/SecondaryDraw";
import Main from "../home/components/Main";
import MessageInterface from "./components/MessageInterface";
import ServerChannels from "../home/components/ServerChannels";
import UserServers from "../home/components/UserServers";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../../hooks/useCrud";
import { ServerInterface } from "../../@types/server.d";
import { useEffect } from "react";

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  const { fetchData, data, error, isLoading } = useCrud<ServerInterface>(
    [],
    `server/select/?by_serverid=${serverId}`
  );

  const isChannel = (): boolean => {
    if (!channelId) {
      return true;
    }

    return data.some((server) =>
      server.channel_server.some(
        (channel) => channel.id === parseInt(channelId)
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, channelId]);

  if (error && error.message === "400") {
    navigate("/");
    return null;
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <UserServers data={data} />
      </PrimaryDraw>

      <SecondaryDraw>
        <ServerChannels data={data} />
      </SecondaryDraw>
      <Main>
        <MessageInterface />
      </Main>
    </Box>
  );
};

export default Server;
