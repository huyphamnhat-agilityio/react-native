import { render, screen } from "@/test-utils";
import Text, { TextProps } from "..";

describe("Text", () => {
  const setup = (props?: TextProps) => render(<Text {...props} />);

  it("should render correctly", () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correctly with given props", () => {
    setup({
      font: "Montserrat_200ExtraLight",
      children: "Mock title",
      size: 5,
    });

    expect(screen.getByText("Mock title")).toBeVisible();
  });
});
