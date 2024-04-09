import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./Select";

describe("Select", ()=>{
    const optionsMock = [
        {title: "titulo", value: "value", icon: "more_horiz"},
        {title: "titulo1", value: "value1", icon: "more_vert"}
    ]
    test("Should render error", ()=>{
        render(<Select selected={{}} options={[]} error={true} />)
        expect(screen.getByText(/Debes seleccionar una opción/i)).toBeDefined()
    })
    test("Should show selected value", ()=>{
        render(<Select selected={{title:"titulo", value:"more_vert", icon:"more_vert"}} options={[]} error={true} />)
        expect(screen.getByText(/titulo/i)).toBeDefined()
        const icon = screen.getByText(/more_vert/i)
        expect(icon.classList.contains("material-icons"))
    })
    test("Should show the options when the selector is clicked", ()=>{
        render(<Select placeholder="select" selected={{}} options={optionsMock} error={false} />)
        const select = screen.getByText(/select/i)
        expect(select).toBeDefined()
        fireEvent.click(select.parentElement)
        const option1 = screen.getByText("titulo")
        expect(option1).toBeDefined()
        expect(option1.nextElementSibling.classList.contains("material-icons"))
    })
})