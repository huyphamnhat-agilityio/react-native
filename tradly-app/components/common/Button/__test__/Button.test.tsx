import { render, screen } from "@/test-utils";
import Button, { ButtonProps } from "..";

describe("Button", () => {
  const setup = (props?: ButtonProps) => render(<Button {...props} />);

  it("should render correctly", () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correctly with given props", () => {
    setup({
      title: "Mock primary",
      variant: "primary",
    });

    expect(screen.getByText("Mock primary")).toBeVisible();

    setup({
      title: "Mock secondary",
      variant: "secondary",
    });

    expect(screen.getByText("Mock secondary")).toBeVisible();
  });
});
