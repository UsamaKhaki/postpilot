import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ComposerPage from "./page";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  cleanup();
  push.mockReset();
});

describe("ComposerPage", () => {
  it("asks for an idea before calling the API", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ComposerPage />);

    fireEvent.click(screen.getByRole("button", { name: /generate draft/i }));

    expect(screen.getByRole("alert").textContent).toBe("Add an idea first.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the idea and selected tone, then previews the draft", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ text: "Generated draft", source: "fallback" }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ComposerPage />);

    fireEvent.change(screen.getByLabelText(/on your mind/i), { target: { value: "Shipping faster" } });
    fireEvent.click(screen.getByRole("button", { name: "Contrarian" }));
    fireEvent.click(screen.getByRole("button", { name: /generate draft/i }));

    expect(await screen.findByText("Generated draft")).toBeTruthy();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/ai/generate");
    expect(JSON.parse(init.body)).toEqual({ idea: "Shipping faster", tone: "Contrarian" });
    expect(screen.getByRole("button", { name: "Contrarian" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("shows the server's validation message when saving fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ text: "Draft", source: "fallback" }))
      .mockResolvedValueOnce(jsonResponse({ error: "Post body must be at most 3000 characters" }, 400));
    vi.stubGlobal("fetch", fetchMock);
    render(<ComposerPage />);

    fireEvent.change(screen.getByLabelText(/on your mind/i), { target: { value: "Idea" } });
    fireEvent.click(screen.getByRole("button", { name: /generate draft/i }));
    fireEvent.click(await screen.findByRole("button", { name: /save as draft/i }));

    expect((await screen.findByRole("alert")).textContent).toMatch(/3000 characters/);
    expect(push).not.toHaveBeenCalled();
  });

  it("schedules the draft and navigates to the posts list", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ text: "Draft", source: "fallback" }))
      .mockResolvedValueOnce(jsonResponse({ post: { id: "1" } }, 201));
    vi.stubGlobal("fetch", fetchMock);
    render(<ComposerPage />);

    fireEvent.change(screen.getByLabelText(/on your mind/i), { target: { value: "Idea" } });
    fireEvent.click(screen.getByRole("button", { name: /generate draft/i }));
    fireEvent.click(await screen.findByRole("button", { name: /schedule post/i }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard/posts"));
    const saved = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(saved.body).toBe("Draft");
    expect(Number.isNaN(new Date(saved.scheduledFor).getTime())).toBe(false);
  });
});
