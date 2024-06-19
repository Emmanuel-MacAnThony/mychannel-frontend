import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { ServerInterface } from "../../../@types/server.d";

interface ServerChannelProps {
  data: ServerInterface[];
}

const ServerChannels = (props: ServerChannelProps) => {
  const { data } = props;
  const server_name = data?.[0]?.name ?? "Server";
  const theme = useTheme();
  const { serverId } = useParams();
  // const isDarkMode = theme.palette.mode === "dark" ? true : false;

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {server_name}
        </Typography>
      </Box>
      <List
        sx={{
          py: 0,
        }}
      >
        {data.flatMap((obj) => {
          return obj.channel_server.map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              sx={{
                display: "block",
                maxHeight: "40px",
              }}
              dense
            >
              <Link
                to={`/server/${serverId}/${item.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemButton sx={{ minHeight: 48 }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        textAlign={"start"}
                        paddingLeft={1}
                        fontWeight={"bold"}
                      >
                        {item.name}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          ));
        })}
      </List>
    </>
  );
};

export default ServerChannels;
