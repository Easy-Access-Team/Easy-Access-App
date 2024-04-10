import { render, screen } from "@testing-library/react"
import {expect} from "vitest"
import DisplayData from "./index.jsx"
describe("Display Data", () => {
    const data = {
        nombre: "Mock",
        apellido: "Data"
    }
    const nodata = undefined
    test("should load skeleton first", ()=>{
        render(<DisplayData loading={true} loader={<div data-testid="skeleton">Cargando</div>}><p>Data</p></DisplayData>)
        expect(screen.getByTestId("skeleton")).toBeDefined()
        const container = screen.getByTestId("container")
        expect(container.firstElementChild === <p>Data</p>).toBe(false)
    })
    test("should load secondary loader when is data available", ()=>{
        render(<DisplayData loading={true} data={data} loader={<div data-testid="skeleton">Skeleton</div>}>
            <p>{data.nombre}</p>
        </DisplayData>)
        expect(screen.getByText("Cargando")).toBeDefined()
        expect(screen.getByTestId("skeleton")).toBeDefined()
        const container = screen.getByTestId("container")
        expect(container.firstElementChild === <p>{data.nombre}</p>).toBe(false)
    })
    test("should render error if there is an error", ()=>{
        render(<DisplayData loading={false} data={data} error={{code: "Error", message: "Content"}} loader={<div>Skeleton</div>}>
            <p>{data.nombre}</p>
        </DisplayData>)
        expect(screen.getByText("Error")).toBeDefined()
        expect(screen.getByText("Content")).toBeDefined()
        
    })

    test("should render data if there is no error", ()=>{
        render(<DisplayData loading={false} data={data} error="" loader={<div>Skeleton</div>}>
            <p>{data.nombre}</p>
        </DisplayData>)
        expect(screen.getByText("Mock")).toBeDefined()

    })
    test("should render no data if there isn't any data", ()=>{
        render(<DisplayData loading={false} data={nodata} error="" noData={{message: "NoData", content: "NoContent"}} loader={<div>Skeleton</div>}>
            <p>{nodata?.nombre}</p>
        </DisplayData>)
        expect(screen.getByText("NoData")).toBeDefined()
        expect(screen.getByText("NoContent")).toBeDefined()
        const container = screen.getByTestId("container")
        expect(container.firstElementChild === <p>{nodata?.nombre}</p>).toBe(false)
    })
})