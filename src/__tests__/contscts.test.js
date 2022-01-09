import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { Contacts } from "../pages/Contacts";
import { serverTests } from "../serverTests";
import { users } from "../__fixtures__/users";

beforeAll(() => serverTests.listen());

afterEach(() => serverTests.resetHandlers());

afterAll(() => serverTests.close());

describe("contacts get data", () => {
  test("loading", async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  });

  test("success", async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");
    await waitForElementToBeRemoved(loader);
    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
  });

  test("fail", async () => {
    serverTests.use(
      rest.get("https://randomuser.me/api/?results=10", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "Internal serverTests error",
          })
        );
      })
    );
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");
    await waitForElementToBeRemoved(loader);
    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId("contacts-error")).toBeInTheDocument();
  });
});

describe("contacts data view mode", () => {
  test("should equal table", async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");
    await waitForElementToBeRemoved(loader);
    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
    expect(
      screen.queryByTestId("contacts-grid-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).toHaveClass(
      "Mui-selected"
    );
    expect(screen.getByTestId("toggle-data-view-mode-grid")).not.toHaveClass(
      "Mui-selected"
    );
  });

  test("switch from grid to table", async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");
    await waitForElementToBeRemoved(loader);
    const toggleGrid = screen.getByTestId("toggle-data-view-mode-grid");
    const toggleTable = screen.getByTestId("toggle-data-view-mode-table");
    userEvent.click(toggleGrid);
    userEvent.click(toggleTable);
    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
    expect(
      screen.queryByTestId("contacts-grid-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).toHaveClass(
      "Mui-selected"
    );
    expect(screen.getByTestId("toggle-data-view-mode-grid")).not.toHaveClass(
      "Mui-selected"
    );
    expect(window.localStorage.getItem("dataViewMode")).toEqual("table");
  });

  test("should equal grid", async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");
    await waitForElementToBeRemoved(loader);
    const toggleGrid = screen.getByTestId("toggle-data-view-mode-grid");
    userEvent.click(toggleGrid);
    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );
    expect(screen.getByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );
    expect(window.localStorage.getItem("dataViewMode")).toEqual("grid");
  });

  test("should equal grid with reload page", async () => {
    window.localStorage.setItem("dataViewMode", "grid");
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");
    await waitForElementToBeRemoved(loader);
    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );
    expect(screen.getByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );
    window.localStorage.clear();
  });
});

describe("contacts filter", () => {
  test("by default", async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(screen.queryAllByTestId("contacts-table-row")).toHaveLength(2);
  });
  test("by full name", async () => {
    const inputFullNameValue = users[0].name.first;
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    userEvent.type(
      screen.getByRole("textbox", { name: /search by full name/i }),
      inputFullNameValue
    );
    expect(screen.queryAllByTestId("contacts-table-row")).toHaveLength(1);
    expect(
      screen.queryByTestId("contacts-table-cell-full-name")
    ).toHaveTextContent(inputFullNameValue);
  });

  test("should clear", async () => {
    const inputFullNameValue = users[0].name.first;
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    userEvent.type(
      screen.getByRole("textbox", { name: /search by full name/i }),
      inputFullNameValue
    );
    userEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(screen.queryAllByTestId("contacts-table-row")).toHaveLength(2);
    expect(
      screen.getByRole("textbox", { name: /search by full name/i })
    ).toHaveValue("");
  });
});
