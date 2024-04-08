import { render, screen, fireEvent } from "@testing-library/react"
import {expect, vi} from "vitest"
import Btn from "./Index"
describe("Btn", () => {
    const fn = vi.fn()
    beforeEach(()=>{
        render(<Btn action="click" onClick={()=>{fn('hello world')}} type="icon" icon="more_vert" colors="primary"/>);
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test("should render button", ()=>{
        expect(screen.getByText("click")).toBeDefined()
    })
    test("should render button with icon", () => {
        const button = screen.getByText("click");
        expect(button).toBeDefined();
        expect(button.classList.contains("icon"));
        expect(screen.getByText("more_vert")).toBeDefined();
    });
    test("should have colors", () => {
        const button = screen.getByText("click");
        expect(button.classList.contains("primary"));
    });
    test("should call onClick function when button is clicked", () => {
        const button = screen.getByText("click");
        fireEvent.click(button);
        expect(fn).toHaveBeenCalled();
    });
    test("should be disabled when disabled prop is true", () => {
        render(<Btn action="disabled" disabled={true} />);
        const button = screen.getByText("disabled");
        expect(button.hasAttribute("disabled"));
    });
})