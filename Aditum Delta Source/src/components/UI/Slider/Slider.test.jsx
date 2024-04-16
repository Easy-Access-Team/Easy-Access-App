import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "./Index";
import {expect} from "vitest"

describe('Slider', () => {
    const datosMock = [
        { id: 1, img: 'image1.jpg', titulo: 'Title 1', descripcion: 'Description 1' },
        { id: 2, img: 'image2.jpg', titulo: 'Title 2', descripcion: 'Description 2' },
        { id: 3, img: 'image3.jpg', titulo: 'Title 3', descripcion: 'Description 3' },
    ];

    test('renders slider items correctly', () => {
        const { getByText } = render(<Slider datos={datosMock} />);
        expect(getByText('Title 1')).toBeDefined()
        expect(getByText('Description 1')).toBeDefined();
        expect(getByText('Title 2')).toBeDefined();
        expect(getByText('Description 2')).toBeDefined();
        expect(getByText('Title 3')).toBeDefined();
        expect(getByText('Description 3')).toBeDefined();
    });

    test('updates slider control and slide on click', () => {
        render(<Slider datos={datosMock} />);
        const control = screen.getByRole("control-1")
        fireEvent.click(control);
        expect(control.classList.contains("active"));
        const initialcontrol = screen.getByRole("control-0")
        fireEvent.click(initialcontrol);
        expect(control.classList.contains(""));
        expect(initialcontrol.classList.contains("active"));
    });
});