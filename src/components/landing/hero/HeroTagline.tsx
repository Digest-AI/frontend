import Typography from "@mui/material/Typography";

type HeroTaglineProps = {
  tagline: string;
};

/** Подзаголовок под главным заголовком hero. */
export function HeroTagline({ tagline }: HeroTaglineProps) {
  return (
    <Typography
      variant="h5"
      component="p"
      sx={{
        fontWeight: 400,
        lineHeight: 1.55,
        opacity: 0.96,
        maxWidth: "38rem",
        m: "0 auto",
        textAlign: "center",
        textShadow: "0 10px 36px rgba(0, 0, 0, 0.5)",
      }}
    >
      {tagline}
    </Typography>
  );
}
