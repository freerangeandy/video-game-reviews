import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import GamesIndexPane from "./GamesIndexPane"
Enzyme.configure({ adapter: new Adapter() })
import { BrowserRouter } from 'react-router-dom'

describe("GamesIndexPane", () => {
  let wrapper
  let testGames

  beforeEach(() => {
    testGames = [
      { id: 1, title: "Zelda" },
      { id: 2, title: "Kirby" },
      { id: 3, title: "Mario" }
    ]
    wrapper = mount(
      <BrowserRouter>
        <GamesIndexPane gamesList={testGames} />
      </BrowserRouter>
    )
  })

  it("should render as many elements as number of games received via props", () => {
      expect(wrapper.find("h4")).toHaveLength(3)
  })
})
