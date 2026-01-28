export const responsiveText = {
  heading: "text-3xl md:text-4xl lg:text-6xl",
  subheading: "text-xl md:text-2xl",
  paragraph: "text-sm md:text-base lg:text-xl",
  button: "text-sm md:text-base lg:text-lg",
  sectionTitle: "text-2xl md:text-3xl lg:text-4xl",
  cardTitle: "text-lg md:text-xl",
  cardText: "text-xs md:text-sm",
} as const;

export type ResponsiveTextKey = keyof typeof responsiveText;