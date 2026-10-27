import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ContactForm } from "./contact-form";

afterEach(cleanup);

describe("ContactForm", () => {
  it("says the message was not sent instead of faking success", () => {
    const { container } = render(<ContactForm />);
    fireEvent.submit(container.querySelector("form")!);

    expect(screen.getByRole("status").textContent).toMatch(/message not sent/i);
    expect(screen.queryByText(/message sent/i)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Back to the form" }));
    expect(screen.getByRole("button", { name: "Submit message" })).toBeTruthy();
  });
});
