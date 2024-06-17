import { useEffect } from "react";
import useCrud from "../../../hooks/useCrud";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../../config";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ExploreCategories = () => {
  const { data, fetchData, error, isLoading } = useCrud<Category>(
    [],
    "server/category"
  );

  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <Box>Something went wrong...</Box>;
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const isDarkMode = theme.palette.mode === "dark" ? true : false;

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
        Explore
      </Box>
      <List
        sx={{
          py: 0,
        }}
      >
        {data.map((item: Category) => {
          return (
            <ListItem
              disablePadding
              key={item.id}
              sx={{
                display: "block",
              }}
              dense
            >
              <Link
                to={`/explore/${item.name}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemButton sx={{ minHeight: 48 }}>
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                    <ListItemAvatar sx={{ minWidth: "0px" }}>
                      <img
                        alt="category icon"
                        src={`${MEDIA_URL}/${item.icon}`}
                        style={{
                          width: "25px",
                          height: "25px",
                          display: "block",
                          margin: "auto",
                          filter: isDarkMode ? "invert(100%)" : "none",
                        }}
                      />
                    </ListItemAvatar>
                  </ListItemIcon>
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
          );
        })}
      </List>
    </>
  );
};

export default ExploreCategories;
