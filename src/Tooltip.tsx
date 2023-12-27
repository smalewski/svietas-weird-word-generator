import { Tooltip as TooltipBase, Box } from "@mui/joy";

export default function Tooltip({ title, children, ...props }) {
  return (
    <TooltipBase
      title={<Box sx={{ textAlign: "justify", maxWidth: 400 }}>{title}</Box>}
      {...props}
    >
      {children}
    </TooltipBase>
  );
}
