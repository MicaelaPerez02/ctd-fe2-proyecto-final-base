import { render, screen, act } from "../../test-utils";
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { MENSAJE_CARGANDO, NO_ENCONTRADO, NOMBRE_INVALIDO } from "./constants";

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

    test('Should show error message when author name is invalid', async () => {
        render(<Cita />)
        const characterName = 'invalidName';
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");

        await userEvent.type(input, characterName);
        const button = await screen.findByText("Obtener Cita");
        userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(NOMBRE_INVALIDO)).toBeInTheDocument();
        }, {timeout: 2500});
    })
});
