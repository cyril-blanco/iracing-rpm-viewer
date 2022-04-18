import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RPMLapsBars from "./RPMLapsBars";

describe("<RPMLapsBars />", () => {
  test("it should mount", () => {
    render(<RPMLapsBars />);

    const rpmLapsBars = screen.getByTestId("RPMLapsBars");

    expect(rpmLapsBars).toBeInTheDocument();
  });
});
