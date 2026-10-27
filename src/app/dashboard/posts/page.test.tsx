import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostsPage from "./page";
import type { Post } from "@/server/data";

const POSTS: Post[] = [
  { id: "a", body: "Awaiting post body", tag: "AI", status: "Awaiting approval", when: "Tomorrow" },
  { id: "s", body: "Scheduled post body", tag: "SaaS", status: "Scheduled", when: "Wed" },
  { id: "p", body: "Published post body", tag: "Design", status: "Published", when: "2h ago", likes: 3, comments: 1 },
];

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(cleanup);

describe("PostsPage", () => {
  it("shows a loading state, then the posts", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ posts: POSTS })));
    render(<PostsPage />);

    expect(screen.getByRole("status").textContent).toMatch(/loading posts/i);
    expect(await screen.findByText("Awaiting post body")).toBeTruthy();
    expect(screen.getByText("Published post body")).toBeTruthy();
    // Editing has no backend yet, so the page must not offer controls that do nothing.
    expect(screen.queryByRole("button", { name: "Edit" })).toBeNull();
    expect(screen.queryByRole("button", { name: "More" })).toBeNull();
  });

  it("filters by status tab and shows an empty state", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ posts: POSTS })));
    render(<PostsPage />);
    await screen.findByText("Awaiting post body");

    fireEvent.click(screen.getByRole("button", { name: "Scheduled" }));
    expect(screen.getByText("Scheduled post body")).toBeTruthy();
    expect(screen.queryByText("Awaiting post body")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Draft" }));
    expect(screen.getByText("No posts here yet")).toBeTruthy();
  });

  it("shows an error and recovers on retry", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ error: "boom" }, 500))
      .mockResolvedValueOnce(jsonResponse({ posts: POSTS }));
    vi.stubGlobal("fetch", fetchMock);
    render(<PostsPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Try again" }));
    expect(await screen.findByText("Awaiting post body")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("approves a post, opens the LinkedIn composer and reloads", async () => {
    const shareUrl = "https://www.linkedin.com/feed/?shareActive=true&text=x";
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input) === "/api/posts/a/approve" && init?.method === "POST") {
        return Promise.resolve(jsonResponse({ ok: true, shareUrl, mode: "manual" }));
      }
      return Promise.resolve(jsonResponse({ posts: POSTS }));
    });
    vi.stubGlobal("fetch", fetchMock);
    const openSpy = vi.spyOn(window, "open").mockReturnValue(null);
    render(<PostsPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Approve" }));

    await waitFor(() => expect(openSpy).toHaveBeenCalledWith(shareUrl, "_blank", "noopener"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
  });
});
