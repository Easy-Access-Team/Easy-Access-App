import { render, screen } from "@testing-library/react"
import { expect } from "vitest"
import Input from "./Input"
describe("Input", () => {
    test("Should have class error if there is an error and show the message.", () => {
        render(<Input value="test" error={true} message="IsError" />)
        const input = screen.getByDisplayValue("test")
        expect(input.classList.contains("error"))
        expect(screen.getByText("IsError")).toBeDefined()
    })
})