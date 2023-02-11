import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

type Props = {
  image?: string;
  subtitle: string;
  title: string;
  action?: {
    onClick: () => void;
    title: string;
  };
};

const CardProperty = ({ image, subtitle, title, action }: Props) => {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      {image && (
        <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      )}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>

        <Typography variant="body2">{title}</Typography>
      </CardContent>
      {action && (
        <CardActions>
          <Button
            onClick={action.onClick}
            style={{ marginLeft: "auto" }}
            size="small"
          >
            {action.title}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CardProperty;
