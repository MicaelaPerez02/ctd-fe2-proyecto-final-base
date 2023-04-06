import { setupServer } from "msw/node";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Cita from "./Cita";
import { handlers } from "../../mocks/handlers";
import citaSlice from "../quote/citaSlice";
import { configureStore } from "@reduxjs/toolkit";

const server = setupServer(...handlers);

const store = configureStore({
    reducer: {
        cita: citaSlice,
    },
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita component", () => {
    it("Should renders a quote from the API", async () => {
        render(
            <Provider store={store}>
                <Cita />
            </Provider>
        );

        const input = screen.getByLabelText("Author Cita");
        fireEvent.change(input, { target: { value: "Nelson" } });
        const button = screen.getByLabelText("Obtener Cita");
        fireEvent.click(button);

        const quoteElement = await screen.findByText(
            "Shoplifting is a victimless crime, like punching someone in the dark."
        );
        expect(quoteElement).toBeInTheDocument();
        expect(screen.getByText("Nelson Muntz")).toBeInTheDocument();
    });

    it("Should display quote for valid author", async () => {
        render(
            <Provider store={store}>
                <Cita />
            </Provider>
        );

        const input = screen.getByLabelText("Author Cita");
        fireEvent.change(input, { target: { value: "Milhouse Van Houten" } });
        const button = screen.getByLabelText("Obtener Cita");
        fireEvent.click(button);

        const quoteElement = await screen.findByText(
            "Remember the time he ate my goldfish? And you lied and said I never had a goldfish. Then why did I have the bowl, Bart? Why did I have the bowl?",
        );
        expect(quoteElement).toBeInTheDocument();
        expect(screen.getByText("Milhouse Van Houten")).toBeInTheDocument();
    });
});