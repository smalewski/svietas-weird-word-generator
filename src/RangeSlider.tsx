import * as React from "react";
import Box from "@mui/joy/Box";
import Slider, { sliderClasses } from "@mui/joy/Slider";

type RangeSliderProps = {
  min: number;
  max: number;
  setMin: (value: number) => void;
  setMax: (value: number) => void;
  bot: number;
  top: number;
};

export default function RangeSlider(props: RangeSliderProps) {
  return (
    <Slider
      defaultValue={[3, 8]}
      getAriaLabel={() => "Generated word length range"}
      getAriaValueText={(value) => `${value}`}
      marks={[
        {
          value: props.bot,
          label: props.bot,
        },
        {
          value: props.top,
          label: props.top,
        },
      ]}
      min={props.bot}
      max={props.top}
      valueLabelDisplay="on"
      onChange={(_, value) => {
        props.setMin(value[0]);
        props.setMax(value[1]);
      }}
    />
  );
}
