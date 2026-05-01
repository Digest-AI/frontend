import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type HeroTitleProps = {
  reduce: boolean | null;
  title: string;
};

/** Главный заголовок с градиентной заливкой и опциональной анимацией. */
export function HeroTitle({ reduce, title }: HeroTitleProps) {
  return (
    <Typography
      variant="h1"
      sx={{
        m: 0,
        px: { xs: 1, sm: 0 },
        fontSize: {
          xs: "clamp(2.85rem, 9vw, 4rem)",
          sm: "clamp(4rem, 11vw, 5.5rem)",
          md: "clamp(5rem, 11vw, 7rem)",
        },
        lineHeight: 1.12,
        fontWeight: 800,
        letterSpacing: "-0.04em",
        textAlign: "center",
        overflow: "visible",
        "@keyframes heroTitleShimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "33%": { backgroundPosition: "70% 50%" },
          "66%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Box
        component="span"
        sx={{
          display: "inline-block",
          maxWidth: "100%",
          overflow: "visible",
          paddingBottom: "0.06em",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          backgroundImage: reduce
            ? "linear-gradient(118deg, #ede9fe 10%, #a78bfa 38%, #2dd4bf 68%, #c4b5fd 92%)"
            : `
                      linear-gradient(
                        115deg,
                        #a78bfa 0%,
                        #e9d5ff 14%,
                        #7c3aed 28%,
                        #5eead4 42%,
                        #c084fc 56%,
                        #22d3ee 70%,
                        #e9d5ff 84%,
                        #a78bfa 100%
                      )
                    `,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          backgroundSize: reduce ? "100% 100%" : "320% 100%",
          backgroundPosition: reduce ? undefined : "0% 50%",
          ...(reduce
            ? {}
            : {
                animation: "heroTitleShimmer 14s ease-in-out infinite",
              }),
          filter: reduce
            ? "drop-shadow(0 14px 40px rgba(0, 0, 0, 0.55))"
            : "drop-shadow(0 18px 50px rgba(0, 0, 0, 0.5))",
        }}
      >
        {title}
      </Box>
    </Typography>
  );
}
