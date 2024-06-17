import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import useCrud from "../../../hooks/useCrud";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../../config";

interface Props {
  open?: boolean;
}

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
}

const PopularChannels: React.FC<Props> = ({ open }) => {
  const { data, fetchData, error, isLoading } = useCrud<Server>(
    [],
    "server/select"
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <Box>Something went wrong...</Box>;
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%",
        }}
      >
        <Typography
          sx={{
            display: open ? "block" : "none",
            fontWeight: "bold",
          }}
        >
          Popular
        </Typography>
      </Box>
      <List>
        {data?.map((item: Server) => {
          return (
            <ListItem
              key={item.id}
              disablePadding
              sx={{
                display: "block",
              }}
              dense
            >
              <Link
                to={`/server/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 0,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    <ListItemAvatar
                      sx={{
                        minWidth: "50px",
                      }}
                    >
                      <Avatar
                        alt="Server Icon"
                        src={`${MEDIA_URL}/${item.icon}`}
                      />
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.2,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: "textSecondary",
                        }}
                      >
                        {item.category}
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                    primaryTypographyProps={{
                      sx: {
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default PopularChannels;
