import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});
afterEach(cleanup);

describe("ThemeToggle", () => {
  it("applies and persists the professional theme", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: /professional/i }));

    expect(localStorage.getItem("pp-theme")).toBe("pro");
    expect(document.documentElement.getAttribute("data-theme")).toBe("pro");
    expect(screen.getByRole("button", { name: /professional/i }).getAttribute("aria-pressed")).toBe("true");
  });

  it("restores a saved theme on mount and can switch back", () => {
    localStorage.setItem("pp-theme", "pro");
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("pro");

    fireEvent.click(screen.getByRole("button", { name: /playful/i }));
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("ignores unknown stored values", () => {
    localStorage.setItem("pp-theme", "neon");
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /playful/i }).getAttribute("aria-pressed")).toBe("true");
  });
});
