import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContacts } from "./useContacts";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ContactsTable } from "./ContactsTable";
import { Box } from "@mui/material";
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { VIEW_MODES } from "../../constants/viewmodes";
import { useDataViewMode } from "./useDataViewMode";

export const Contacts = () => {
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();
  return (
    <Container sx={{ mt: (theme) => theme.spacing(3) }}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <Typography variant="h4" component="h1">
              Contacts
            </Typography>
            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <LinearProgress data-testid="contacts-loader" />;
            }
            if (contacts.isError) {
              return <div data-testid="contacts-error">...error</div>;
            }
            if (dataViewMode === VIEW_MODES.TABLE) {
              return <ContactsTable data={contacts.data} />;
            }
            if (dataViewMode === VIEW_MODES.GRID) {
              return <div data-testid="contacts-grid-container">GRID</div>;
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
