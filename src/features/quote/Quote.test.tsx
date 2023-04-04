import { render, screen } from "../../test-utils";
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { MENSAJE_CARGANDO, NO_ENCONTRADO, NOMBRE_INVALIDO } from "./constants";
import { ICita } from "./types";

describe("Cita component", () => {
    it("Should render Cita component", () => {
        render(<Cita />);
        expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
    });

    it("Should render initial state when no author name is entered", () => {
        render(<Cita />);
        expect(screen.getByText(NO_ENCONTRADO)).toBeInTheDocument();
    });

    it("Should show 'CARGANDO...' when fetching data", async () => {
        render(<Cita />);
        const button = screen.getByLabelText("Obtener cita aleatoria");
        userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(MENSAJE_CARGANDO)).toBeInTheDocument();
        });
    });

    it("Should show error message when author name is invalid", async () => {
        render(<Cita />)
        const characterName = "invalidName";
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");

        await userEvent.type(input, characterName);
        const button = await screen.findByText("Obtener Cita");
        userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(NOMBRE_INVALIDO)).toBeInTheDocument();
        }, { timeout: 2500 });
    });
    it("Should render a quote randomly", async () => {
        render(<Cita />)

        const button = screen.getByText("Obtener cita aleatoria");
        userEvent.click(button)
        const failQuote = screen.getByText("No se encontro ninguna cita");

        await waitFor(() => {
            expect(failQuote.textContent).not.toBe("");
        }, { timeout: 1000 });
    });

    it("Should render a quote by Lisa Simpson", async () => {
        const characterName = "Lisa Simpson";

        render(<Cita />);

        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        await userEvent.type(input, characterName);

        const button = await screen.findByText("Obtener Cita");
        userEvent.click(button);

        await waitFor(() => screen.findByText(characterName), { timeout: 2000 });

        const quoteAuthor = screen.getByText(characterName);
        expect(quoteAuthor).toBeInTheDocument();
    });

    it("Should clear the quote when clicking the 'Borrar' button", async () => {
        const characterName = "Nelson";

        render(<Cita />);

        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        const cleanButton = screen.getByText("Borrar");

        await userEvent.type(input, characterName);
        expect(input).toHaveValue(characterName);

        userEvent.click(cleanButton);

        await waitFor(() => {
            expect(input).toHaveValue("");
        });
    });

    it("Should display the message 'Please enter a valid name' when entering numbers", async () => {
        render(<Cita />);

        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        await userEvent.type(input, "1111");

        const button = screen.getByText("Obtener Cita");
        await userEvent.click(button);

        expect(await screen.findByText("Por favor ingrese un nombre válido")).toBeInTheDocument();
    });

    it('Should have the correct properties and types', () => {
        const cita: ICita = {
            personaje: "MilHouse Van Houten",
            cita: "Remember the time he ate my goldfish? And you lied and said I never had a goldfish. Then why did I have the bowl, Bart? Why did I have the bowl?",
            imagen: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMilhouseVanHouten.png?1497567513002",
            direccionPersonaje: "Right",
        };

        expect(cita).toHaveProperty("personaje", "MilHouse Van Houten");
        expect(cita).toHaveProperty("cita", "Remember the time he ate my goldfish? And you lied and said I never had a goldfish. Then why did I have the bowl, Bart? Why did I have the bowl?");
        expect(cita).toHaveProperty("imagen", "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMilhouseVanHouten.png?1497567513002");
        expect(cita).toHaveProperty("direccionPersonaje", "Right");
    });
});
