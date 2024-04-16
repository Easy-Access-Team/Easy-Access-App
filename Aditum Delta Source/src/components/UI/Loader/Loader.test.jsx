import { cleanup, render, screen } from "@testing-library/react"
import Loader from "./Index"
describe("Loader", ()=>{
    afterEach(cleanup)
    test("Should render loader if there is a message", ()=>{
        render(<Loader message="Loading"/>)
        screen.getByText(/Loading/i)
    })
})