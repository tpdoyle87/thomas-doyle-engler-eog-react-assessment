import { withStyles } from "@material-ui/core/styles";
import CardHeaderRaw from "@material-ui/core/CardHeader";


export const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main,
  },
  title: {
    color: "white"
  }
});

export const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

export const styles = {
  card: {
    margin: "5% 25%"
  },
  goRight: {
    textAlign: "right"
  },
  mapContainer: {
    height: "50vh",
    width: "100%"
  },
  definedSize: {
    width: "40rem",
    height: "20rem"
  }
};
