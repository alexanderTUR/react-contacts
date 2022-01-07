import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContacts } from "./useContacts";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ContactsTable } from "./ContactsTable";

export const Contacts = () => {
  const contacts = useContacts();

  return (
    <Container sx={{ mt: (theme) => theme.spacing(3) }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" gutterBottom>
            Contacts
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <LinearProgress />;
            }
            if (contacts.isError) {
              return <div>...error</div>;
            }
            return <ContactsTable data={contacts.data} />;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
